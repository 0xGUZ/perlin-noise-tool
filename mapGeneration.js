

// --------------------------------------
//              GENERATE
//              TERRAIN
// --------------------------------------

function generateNoise(xCoord, yCoord) {

  //slider values
  let totalNoise = document.getElementById("totalNoiseSlider").value / 100;
  let persistence = document.getElementById("persistenceSlider").value / 100;
  let octaveCount = document.getElementById("octaveCountSlider").value;

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

// Hash function to determine gradient
function hashCoordinates(xIntCoord, yIntCoord) {
  
  //slider var
  let randomizer = document.getElementById("randomizerSlider").value * Math.random();
  let seed = document.getElementById("seedSlider").value;

  let hash = Math.sin(xIntCoord * 12.9898 + yIntCoord * 78.233 + seed + randomizer) * 43758.5453;
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
//              NOISE
// --------------------------------------

const mapWidth = 512;
const mapHeight = 512;

const canvas = document.getElementById("gameCanvas");
canvas.width = mapWidth;
canvas.height = mapHeight;
let ctx = canvas.getContext("2d");

const convertCheckbox = document.getElementById("convertCheckbox");

//STORES CURRENT SESSION NOISEVALUES TO AVOID RELOADING
let noiseValues = [];

function generateNewMap(){

  
  for (let x = 0; x < mapWidth; x++) {
    noiseValues[x] = [];
    for (let y = 0; y < mapHeight; y++) {
      noiseValues[x][y] = generateNoise(x / mapWidth, y / mapHeight);
    }
  }

  convertCheckbox.checked ? colorTheMap() : shadowTheMap();
}

function shadowTheMap() {

   let randomizer = document.getElementById("randomizerSlider").value * Math.random();

console.log(randomizer);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let x = 0; x < mapWidth; x++) {
    for (let y = 0; y < mapHeight; y++) {
      let noiseValue = noiseValues[x][y];

        ctx.fillStyle = `rgb(${noiseValue * 255}, ${noiseValue * 255}, ${noiseValue * 255})`;
        ctx.fillRect(x, y, 1, 1);

    }
  }
}

//colors
const color1 = document.getElementById("color-1");
const color2 = document.getElementById("color-2");
const color3 = document.getElementById("color-3")

function colorTheMap() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(let x = 0; x < mapWidth; x++){

    for(let y = 0; y < mapHeight; y++){

      let terrain = colorController(noiseValues[x][y]);

      switch (terrain) {
        
        case "color-1":
          ctx.fillStyle = "rgb(08,20,66)";
          break;

        case "color-2":
          ctx.fillStyle = "blue";
          break;
      
        case "color-3":
          ctx.fillStyle = "yellow";
          break;
      
        case "color-5":
          ctx.fillStyle = "green";
          break;

        case "color-4":
          ctx.fillStyle = "rgb(25,255,25)";
      
        case "color-6":
          ctx.fillStyle = "rgb(25,255,25)";
          break;
      
        case "color-7":
          ctx.fillStyle = "white";
          break;
      
        default:
          ctx.fillStyle = "gray";
      }

      ctx.fillRect(x, y, 1, 1);

    }
  }

}

function colorController(noiseValue) {
  if (noiseValue <= 0.000005) {
    return "color-1";
  }

  if (noiseValue >= 0.000005 && noiseValue < 0.2) {
    return "color-2";
  } 
  
  else if (noiseValue >= 0.2 && noiseValue < 0.3) {
    return "color-3";
  } 
  
  else if (noiseValue >= 0.3 && noiseValue < 0.5) {
    return "color-4";
  }

  else if (noiseValue >= 0.5 && noiseValue < 0.7) {
    return "color-5";
  } 

  else if (noiseValue >= 0.7 && noiseValue < 0.9) {
    return "color-6";
  }
  
  else {
    return "color-7";
  }
}

//LISTENERS
convertCheckbox.oninput = function() {

  convertCheckbox.checked ? colorTheMap() : shadowTheMap();

}

