const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let scale = 1;
let x = 0;
let y = 0;

// Register mouse events
canvas.addEventListener("wheel", handleScroll);
canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mouseup", handleMouseUp);
canvas.addEventListener("mousemove", handleMouseMove);

// Handle mouse wheel events for zooming
function handleScroll(event) {
    event.preventDefault();
    const delta = event.deltaY > 0 ? 0.1 : -0.1;
    scale += delta;
    scale = Math.min(Math.max(0.1, scale), 10);
    redraw();
}

// Handle mouse down events for panning
let isDragging = false;
let startX, startY;

function handleMouseDown(event) {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
}

// Handle mouse up events for panning
function handleMouseUp(event) {
    isDragging = false;
}

// Handle mouse move events for panning
function handleMouseMove(event) {
    if (!isDragging) return;
    x += event.clientX - startX;
    y += event.clientY - startY;
    startX = event.clientX;
    startY = event.clientY;
    redraw();
}

// Redraw the canvas with zoom and pan
function redraw() {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}