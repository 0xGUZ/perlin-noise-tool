// import the p5.js library
import p5 from "p5";

// set the size of each cell
const cellSize = 10;

// create a new p5.js sketch
const sketch = (p) => {

  // initialize the sketch
  p.setup = () => {

        p.createCanvas(columns * cellSize, rows * cellSize);
  
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
