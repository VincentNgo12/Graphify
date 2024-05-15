function getContours(image){
    let src = cv.imread(image);
    let dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);

    // // Pre-processing: Noise reduction with opening
    // let kernel = cv.getStructuringElement(cv.MORPH_ELLIPSE, new cv.Size(3, 3));
    // cv.morphologyEx(src, src, cv.MORPH_OPEN, kernel);

    kernel = cv.getStructuringElement(cv.MORPH_ELLIPSE, new cv.Size(3,3));

    // MORPH_OPEN = removes noise (erosion then dilation)
    cv.morphologyEx(src, src, cv.MORPH_OPEN, kernel);

    kernel = cv.getStructuringElement(cv.MORPH_ELLIPSE, new cv.Size(2,2));

    // MORPH_CLOSE - closes small holes inside the foreground objects, or small black points on the object (dilation then erosion)
    cv.morphologyEx(src, src, cv.MORPH_CLOSE, kernel); 

    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0); //Set the color scheme 


    //cv.Canny(src, dst, 100, 200, 3, false); //Edge detection
    cv.threshold(src, src, 150, 255, cv.THRESH_BINARY + cv.THRESH_OTSU)[1]; //set the threshold


    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    // You can try more different parameters        
    cv.findContours(src, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_NONE );


    let contourPoints = getContourCoordinates(contours);
    src.delete(); dst.delete(); contours.delete(); hierarchy.delete();

    return contourPoints; //the full contours coodinates
}


// Method to extract coordinate from MatVector contours
function getContourCoordinates(contours) {
    let points = {};
    for (let i = 0; i < contours.size(); ++i) {
        const ci = contours.get(i); //current contour
        points[i] = [];
        for (let j = 0; j < ci.data32S.length; j += 2){
        let p = {}
        p.x = ci.data32S[j]
        p.y = ci.data32S[j+1]
        points[i].push(p)
        }
    }

    return points; //the full coordinates
}
