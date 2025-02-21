/* Code to handle the user's drawings on Canvas. Each mouse down and
mouse up will give a single contour which is an array of {x,y} coordinate
objects. This contour arrays will be store in a bigger array 'Contours' to
store all user's drawn contours. */


let isDrawing = false;
let currentContour = []; //current contour
const Contours = []; //all contours

const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');


// Mousedown event
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true; //Start drawing
    currentContour = [{ x: e.offsetX, y: e.offsetY }]; //Start a new contour
});


// Mousemove event
canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    const point = { x: e.offsetX, y: e.offsetY }; //Get the current mouse's coordinate on canvas
    currentContour.push(point); //Add the current point to the current contour
    drawLine(currentContour[currentContour.length - 2], point);
});


// Mouseup event
canvas.addEventListener('mouseup', () => {
    if (!isDrawing) return; //stop drawing
    isDrawing = false;
    // Connect the last point to the first point to form a closed shape
    drawLine(currentContour[currentContour.length - 1], currentContour[0]);
    Contours.push(currentContour);//Add current contour to the list of contours
});


function drawLine(start, end) {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.closePath();
}


// Function to resize canvas properly
function resizeCanvas() {
    const parent = canvas.parentElement;

    // Adjust actual canvas resolution to match display size and aspect ratio
    canvas.width = parent.clientWidth; // Subtract 60 to account for padding
    canvas.height = parent.clientHeight; // Set height to 80% of parent height
}

// Resize canvas when window is resized
window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // Call once at the start