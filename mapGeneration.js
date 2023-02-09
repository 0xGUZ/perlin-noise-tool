// --------------------------------------
//              GENERATE
//              TERRAIN
// --------------------------------------

//slider values
totalNoiseValue = document.getElementById("totalNoiseSlider");
persistenceValue = document.getElementById("persistenceSlider");
octaveCountValue = document.getElementById("octaveCountSlider");
hashxValue = document.getElementById("hashxSlider");
hashyValue = document.getElementById("hashySlider");
hashzValue = document.getElementById("hashzSlider");

totalNoise = totalNoiseValue.value / 100;
persistence = persistenceValue.value / 100;
octaveCount = octaveCountValue.value;
hashx = hashxValue.value;
hashy = hashyValue.value;
hashz = hashzValue.value;



function generateNoise(xCoord, yCoord) {
  /*let totalNoise = totalNoiseValue / 100; //starting area ocuppied by noise or land
  let persistence = persistenceValue / 100; //definition
  let octaveCount = octaveCountValue; //level of detail*/
  for (let currentOctave = 0; currentOctave < octaveCount; currentOctave++) {
    let frequency = 2**currentOctave;
    let amplitude = persistence**currentOctave;
    totalNoise += generatePerlinNoise(xCoord * frequency, yCoord * frequency) * amplitude;
  }
  return totalNoise;
}

// The Perlin noise algorithm
function generatePerlinNoise(xCoord, yCoord) {
  let xIntCoord = Math.floor(xCoord);
  let yIntCoord = Math.floor(yCoord);
  let xFracCoord = xCoord - xIntCoord;
  let yFracCoord = yCoord - yIntCoord;
  let xInterp = fade(xFracCoord);
  let yInterp = fade(yFracCoord);
  let topLeftNoise = gradient(hashCoordinates(xIntCoord, yIntCoord), xFracCoord, yFracCoord);
  let topRightNoise = gradient(hashCoordinates(xIntCoord + 1, yIntCoord), xFracCoord - 1, yFracCoord);
  let bottomLeftNoise = gradient(hashCoordinates(xIntCoord, yIntCoord + 1), xFracCoord, yFracCoord - 1);
  let bottomRightNoise = gradient(hashCoordinates(xIntCoord + 1, yIntCoord + 1), xFracCoord - 1, yFracCoord - 1);
  let xInterpTop = lerp(topLeftNoise, topRightNoise, xInterp);
  let xInterpBottom = lerp(bottomLeftNoise, bottomRightNoise, xInterp);
  return lerp(xInterpTop, xInterpBottom, yInterp);
}

// Interpolation function
function lerp(startValue, endValue, interpAmount) {
  return (1 - interpAmount) * startValue + interpAmount * endValue;
}

// Smoothstep function
function fade(interpAmount) {
  return interpAmount * interpAmount * interpAmount * (interpAmount * (interpAmount * 6 - 15) + 10);
}

/*let hashX = hashxValue;
let hashY = hashyValue;
let hashZ = hashzValue;*/

// Hash function to determine gradient
function hashCoordinates(xIntCoord, yIntCoord) {
  let hash = Math.sin(xIntCoord * hashX + yIntCoord * hashY) * hashZ;
  return hash - Math.floor(hash);
}

// Gradient function to determine the intensity of the noise
function gradient(hash, xFracCoord, yFracCoord) {
  switch (Math.floor(hash * 8) % 8) {
    case 0:
      return xFracCoord + yFracCoord;
    case 1:
      return -xFracCoord + yFracCoord;
    case 2:
      return xFracCoord - yFracCoord;
    case 3:
      return -xFracCoord - yFracCoord;
    case 4:
      return xFracCoord + yFracCoord;
    case 5:
      return -xFracCoord + yFracCoord;
    case 6:
      return xFracCoord - yFracCoord;
    case 7:
      return -xFracCoord - yFracCoord;
    default:
      return 0;
  }
}


// --------------------------------------
//              DISPLAY
//              TERRAIN
// --------------------------------------


// Set the dimensions of the map
const mapWidth = 512;
const mapHeight = 512;

function generateNewMap(){

    alert(totalNoiseValue);
  // Create a 2D array to store the noise values
  let noiseValues = [];
  for (let x = 0; x < mapWidth; x++) {
    noiseValues[x] = [];
    for (let y = 0; y < mapHeight; y++) {
      noiseValues[x][y] = generateNoise(x / mapWidth, y / mapHeight);
    }
  }

  // Create a canvas to display the map
  let canvas = document.getElementById("gameCanvas");
  canvas.width = mapWidth;
  canvas.height = mapHeight;
  document.body.appendChild(canvas);
  let context = canvas.getContext("2d");

  // Fill the canvas with the noise values
  for (let x = 0; x < mapWidth; x++) {
    for (let y = 0; y < mapHeight; y++) {
      let noiseValue = noiseValues[x][y];
      context.fillStyle = `rgb(${noiseValue * 255}, ${noiseValue * 255}, ${noiseValue * 255})`;
      context.fillRect(x, y, 1, 1);
    }
  }
}

generateNewMap();
