/* 
    this script makes a height map using perlin noise

    TODO:
    define that for each height we have certain biome or color
*/

// set the number of columns and rows - 2d grid
const columns = 100;
const rows = 100;

// create an array to store the heights
let heights = [];

// Initialize the array with 0s
for (let x = 0; x < columns; x++) {
  heights[x] = [];
  for (let y = 0; y < rows; y++) {
    heights[x][y] = 0;
  }
}

// generate the heights using perlin
let noiseMax = 0;
let noiseMin = 0;

for (let x = 0; x < columns; x++) {
  for (let y = 0; y < rows; y++) {
    
    let noise = noise(x / 10, y / 10);

    heights[x][y] = noise;

    noiseMax = Math.max(noiseMax, noise);
    noiseMin = Math.min(noiseMin, noise);
  }
}

// normalize the heights so they are between 0 and 1
for (let x = 0; x < columns; x++) {
  for (let y = 0; y < rows; y++) {
    heights[x][y] = (heights[x][y] - noiseMin) / (noiseMax - noiseMin);
  }
}
