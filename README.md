# GTS_Project

## Overview

GDS_Project is a static web application that allows users to draw contours on a canvas or upload images to extract contour coordinates. The application leverages the Desmos Calculator API, and OpenCV.js for image processing and contour extraction.

## Features

- **Drawing Mode**: Users can draw contours on a canvas. Each contour is stored as an array of `{x, y}` coordinates, and all contours are stored in a larger array.
- **Image Mode**: Users can upload images, and the application extracts contour coordinates from the images using OpenCV.js.
- **Desmos Calculator Integration**: Users can visualize the extracted contours using the Desmos Calculator.
- **Clear Canvas**: Users can clear the canvas and reset the contour arrays.
- **Responsive Design**: The application is designed to be responsive and works well on different screen sizes.

## Technologies Used

- **HTML**: Structure of the web page.
- **CSS**: Styling of the web page, including Flexbox for layout and responsiveness.
- **JavaScript**: Functionality for drawing on the canvas, handling image uploads, and integrating with external APIs.
- **OpenCV.js**: Image processing and contour extraction.
- **Desmos Calculator API**: Visualization of contours using Desmos Calculator.

## File Structure

- `index.html`: Main HTML file containing the structure of the web page.
- `styles.css`: CSS file for styling the web page.
- `myCanvas.js`: JavaScript file for handling drawing on the canvas and storing contours.
- `contours.js`: JavaScript file for extracting contour coordinates from uploaded images using OpenCV.js.
- `imageDrop.js`: JavaScript file for handling image uploads and drag-and-drop functionality.
- `DFT.js`: JavaScript file for Discrete Fourier Transform (DFT) related functionality.
- `Desmos.js`: JavaScript file for integrating with the Desmos Calculator.

## Usage

### Drawing Mode

1. Select the "Draw" tab to enter drawing mode.
2. Draw contours on the canvas using the mouse or stylus.
3. Each contour is stored as an array of `{x, y}` coordinates.
4. Click the "Clear Canvas" button to clear the canvas and reset the contour arrays.
5. Click the "Graph Now!" button to visualize the contours using the Desmos Calculator.

### Image Mode

1. Select the "Image" tab to enter image mode.
2. Upload an image by dragging and dropping it into the drop zone or by clicking the "browse" button.
3. The application extracts contour coordinates from the uploaded image using OpenCV.js.
4. Click the "Remove Image" button to remove the uploaded image.
5. Click the "Graph Now!" button to visualize the extracted contours using the Desmos Calculator.

### Desmos Calculator

1. Click the "Graph Now!" button in either drawing mode or image mode to open the Desmos Calculator.
2. The extracted contours are visualized using the Desmos Calculator.
3. Click the "Close Calculator" button to close the Desmos Calculator.
