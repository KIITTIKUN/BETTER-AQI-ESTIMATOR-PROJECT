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

export {averageFourPoints};