import {token} from "./token.js"
import { blueIcon,goldIcon,redIcon,greenIcon,orangeIcon,yellowIcon,violetIcon,greyIcon,blackIcon} from "./marker.js"
import {averageFourPoints } from "./averageFourPoints.js";
import { distanceSorting } from "./distanceSorting.js";
import { distanceFormula } from "./distanceFormula.js";

if(token === 'Input your token in file token.js and you can get token from https://aqicn.org/data-platform/token/'){
  alert(token);
  window.location.reload();
}

const map = L.map('map').setView([13.668485, 100.605801], 12);
const OSM_URL = 'http://tile.openstreetmap.org/{z}/{x}/{y}.png';
const osmLayer = L.tileLayer(OSM_URL);
const WAQI_URL = `https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=${token}`;
const waqiLayer = L.tileLayer(WAQI_URL);
map.addLayer(osmLayer).addLayer(waqiLayer);
const latitude = document.getElementsByClassName('latitude-input');
const longitude = document.getElementsByClassName('longitude-input');

const partitionSetPoint = (dataSet,x,y) => {
  const region = {ne:[],nw:[],sw:[],se:[],ignore:[]};
  const data = dataSet.data
  for(let i =0;i < data.length;i++){
    if (data[i].lat  > y && data[i].lon > x){
      region.ne.push(data[i]);
    } else if (data[i].lat < y &&  data[i].lon > x)  {
      region.nw.push(data[i]);
    } else if (data[i].lat < y && data[i].lon < x) {
      region.sw.push(data[i]);
    } else if ( data[i].lat > y && data[i].lon < x) {
      region.se.push(data[i]);
    } else {
      region.ignore.push(data[i]);
    }
  }
  if(region.ne.length  === 0 ||region.nw.length === 0||region.sw.length  === 0||region.se.length === 0){
    let message = '';
  if(region.ne.length  === 0){
    message = 'north east haven\'t data';}

  if( region.nw.length === 0){
    message = 'north west haven\'t data'
  }

  if(region.sw.length  === 0){
    message = 'south west haven\'t data';
  }

  if(region.se.length === 0){
    message = 'south east haven\'t data';
  }
  alert(message)
  window.location.reload();
  throw new Error(message)
  }
  return region
}
const onMapClick = (e) => {
  let latitude = document.getElementById(`latitude`).value = e.latlng.lat;
  let longitude = document.getElementById(`longitude`).value = e.latlng.lng;
  let minlat = latitude - 0.06;
  let maxlat = latitude + 0.06;
  let minlon = longitude - 0.06;
  let maxlon = longitude + 0.06;
  const myAPI = `https://api.waqi.info/v2/map/bounds?latlng=${minlat},${minlon},${maxlat},${maxlon}&networks=all&token=${token}`;
  async function getData() {
    const response = await fetch(myAPI);
    const aqis = await response.json();
    return aqis;
  }
getData().then(aqis => {
  let x = document.getElementById(`longitude`).value;
  let y = document.getElementById(`latitude`).value;
  const region = partitionSetPoint(aqis,x,y);
  for(let i =0;i<region.ne.length;i++){
    region['ne'][i]['distance'] = distanceFormula(region['ne'][i]['lon'],region['ne'][i]['lat'],x,y);
  }
  for(let i =0;i<region.nw.length;i++){
    region['nw'][i]['distance'] = distanceFormula(region['nw'][i]['lon'],region['nw'][i]['lat'],x,y);
  }
  for(let i =0;i<region.sw.length;i++){
    region['sw'][i]['distance'] = distanceFormula(region['sw'][i]['lon'],region['sw'][i]['lat'],x,y);
  }
  for(let i =0;i<region.se.length;i++){
    region['se'][i]['distance'] = distanceFormula(region['se'][i]['lon'],region['se'][i]['lat'],x,y);
  }
region.ne.sort(distanceSorting);
region.nw.sort(distanceSorting);
region.sw.sort(distanceSorting);
region.se.sort(distanceSorting);
const plotPolygon = (e) => {
  const plot = [region.ne[0],region.nw[0],region.sw[0],region.se[0]];
  const targetPosition = { lat: latitude, lon: longitude };
  const fourPoints = [];
  for (let i = 0; i < 4; i++) {
    fourPoints.push({
      lat: plot[i].lat,
      lon: plot[i].lon,
      aqi: plot[i].aqi,
    });
  }

averageDisplay.innerHTML = `${average}`;
L.polygon(plot).addTo(map);
L.marker([latitude, longitude], {icon: redIcon}).addTo(map);
L.marker([plot[0].lat, plot[0].lon], {icon: greenIcon}).addTo(map);
L.marker([plot[1].lat, plot[1].lon], {icon: blueIcon}).addTo(map);
L.marker([plot[2].lat, plot[2].lon], {icon: yellowIcon}).addTo(map);
L.marker([plot[3].lat, plot[3].lon], {icon: violetIcon}).addTo(map);
let marker1 = L.marker([plot[0].lat, plot[0].lon]).bindPopup(`${plot[0].aqi}`);
let marker2 = L.marker([plot[1].lat, plot[1].lon]).bindPopup(`${plot[1].aqi}`);
let marker3 = L.marker([plot[2].lat, plot[2].lon]).bindPopup(`${plot[2].aqi}`);
let marker4 = L.marker([plot[3].lat, plot[3].lon]).bindPopup(`${plot[3].aqi}`);

let popupGroup = L.layerGroup([marker1, marker2, marker3,marker4]);

map.addLayer(popupGroup);

}
plotPolygon();
});
}
map.on('click', onMapClick);
const averageDisplay = document.getElementById('display-average');
let pointIndex = 1;