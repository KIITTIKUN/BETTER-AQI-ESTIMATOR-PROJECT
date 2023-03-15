const token = 'Input your token in file token.js and you can get token from https://aqicn.org/data-platform/token/';
let blueIcon = new L.Icon({
  iconUrl: 'img/marker-icon-2x-blue.png',
  shadowUrl: 'img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

let goldIcon = new L.Icon({
  iconUrl: 'img/marker-icon-2x-gold.png',
  shadowUrl: 'img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

let redIcon = new L.Icon({
  iconUrl: 'img/marker-icon-2x-red.png',
  shadowUrl: 'img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

let greenIcon = new L.Icon({
  iconUrl: 'img/marker-icon-2x-green.png',
  shadowUrl: 'img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

let orangeIcon = new L.Icon({
  iconUrl: 'img/marker-icon-2x-orange.png',
  shadowUrl: 'img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

let yellowIcon = new L.Icon({
  iconUrl: 'img/marker-icon-2x-yellow.png',
  shadowUrl: 'img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

let violetIcon = new L.Icon({
  iconUrl: 'img/marker-icon-2x-violet.png',
  shadowUrl: 'img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

let greyIcon = new L.Icon({
  iconUrl: 'img/marker-icon-2x-grey.png',
  shadowUrl: 'img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

let blackIcon = new L.Icon({
  iconUrl: 'img/marker-icon-2x-black.png',
  shadowUrl: 'img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const determinant = (m) => {
  let l = m.length - 1;
  if (l === 0) {
    return m[0][0];
    } else {
      if (l === 1) {
        return m[0][0] * m[l][l] - m[0][l] * m[l][0];
      } else {
        return m.reduce(function (p, c, i, a) {
          let sign = i % 2 === 0 ? 1 : -1;
          let minor = a.slice(0);
          minor.splice(0, 1);
          minor = minor.map(function (val) {
            val = val.slice(0);
            val.splice(i, 1);
            return val;
          });
          return p + sign * m[0][i] * determinant(minor);
      }, 0);
    }
  }
};
const cramer = (A, B) => {
  const D = [],
  D1 = [],
  D2 = [],
  D3 = [],
  D4 = [];
  
  for (let i = 0; i < 4; i++) {
    D.push([]);
    D1.push([]);
    D2.push([]);
    D3.push([]);
    D4.push([]);
    for (let j = 0; j < 4; j++) {
      D[i].push(A[i][j]);
      D1[i].push(A[i][j]);
      D2[i].push(A[i][j]);
      D3[i].push(A[i][j]);
      D4[i].push(A[i][j]);
    }
  }
  
  D1[0][0] = B[0];
  D1[1][0] = B[1];
  D1[2][0] = B[2];
  D1[3][0] = B[3];
  
  D2[0][1] = B[0];
  D2[1][1] = B[1];
  D2[2][1] = B[2];
  D2[3][1] = B[3];
  
  D3[0][2] = B[0];
  D3[1][2] = B[1];
  D3[2][2] = B[2];
  D3[3][2] = B[3];
  
  D4[0][3] = B[0];
  D4[1][3] = B[1];
  D4[2][3] = B[2];
  D4[3][3] = B[3];
  
  let detD = determinant(D);
  let a = determinant(D1) / detD;
  let b = determinant(D2) / detD;
  let c = determinant(D3) / detD;
  let d = determinant(D4) / detD;
  return { a, b, c, d };
};

const averageFourPoints = (fourPoints, targetPosition) => {
  const matrixA = [];
  const matrixB = [];
  for (let i = 0; i < fourPoints.length; i++) {
    let lon = fourPoints[i].lon;
    let lat = fourPoints[i].lat;
    let aqi = fourPoints[i].aqi;
    matrixA.push([1, lon, lat, lat * lon]);
    matrixB.push(aqi);
  }
    const { a, b, c, d } = cramer(matrixA, matrixB);
    const x = targetPosition.lon;
    const y = targetPosition.lat;
    
    return a + b * x + c * y + d * x * y;
};

const distanceSorting = (less,more) => {
  return less.distance - more.distance;
}

const distanceFormula = (x1,y1,x2,y2) => {
  return Math.sqrt((x1-x2)**2+(y1-y2)**2);
}

// import {token} from "./token.js"
// import { blueIcon,goldIcon,redIcon,greenIcon,orangeIcon,yellowIcon,violetIcon,greyIcon,blackIcon} from "./marker.js"
// import {averageFourPoints } from "./averageFourPoints.js";
// import { distanceSorting } from "./distanceSorting.js";
// import { distanceFormula } from "./distanceFormula.js";

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
const averageDisplay = document.getElementById('display-average');
let average = Number.parseFloat(averageFourPoints(fourPoints, targetPosition)).toFixed(2);
averageDisplay.innerHTML = `${average}`;
L.polygon(plot).addTo(map);
L.marker([latitude, longitude], {icon: redIcon}).addTo(map);
let marker1 = L.marker([plot[0].lat, plot[0].lon], {icon: greenIcon}).bindPopup(`${plot[0].aqi}`);
let marker2 = L.marker([plot[1].lat, plot[1].lon], {icon: blueIcon}).bindPopup(`${plot[1].aqi}`);
let marker3 = L.marker([plot[2].lat, plot[2].lon], {icon: yellowIcon}).bindPopup(`${plot[2].aqi}`);
let marker4 = L.marker([plot[3].lat, plot[3].lon], {icon: violetIcon}).bindPopup(`${plot[3].aqi}`);

let popupGroup = L.layerGroup([marker1, marker2, marker3,marker4]);

map.addLayer(popupGroup);

}
plotPolygon();
});
}
map.on('click', onMapClick);
let pointIndex = 1;