/* 
    this script makes a height map using perlin noise

    TODO:
    define that for each height we have certain biome or color
*/

import p5 from "p5";

// --------------------------------------
//              GENERATE
//              TERRAIN
// --------------------------------------

// set the number of columns and rows
const columns = 100;
const rows = 100;

// create the heights array
let heights;

// generate the heights for each cell
const generateHeights = () => {
    heights = [];

    for (let x = 0; x < columns; x++) {
        heights[x] = [];

        for (let y = 0; y < rows; y++) {
            heights[x][y] = p5.noise(x * 0.1, y * 0.1);
        }
    }
};

// --------------------------------------
//              DISPLAY
//              TERRAIN
// --------------------------------------

// set the size of each cell
const cellSize = 10;

// create a new p5.js sketch
const sketch = (p) => {

  // initialize the sketch
  p.setup = () => {
    p.createCanvas(columns * cellSize, rows * cellSize);
    generateHeights();
  };

  // draw the terrain
  p.draw = () => {
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            let h = heights[x][y];
            p.fill(h * 255);
            p.rect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
  };
};

// create a new p5.js instance
new p5(sketch);
