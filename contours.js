function getContours(image){
    let src = cv.imread(image);
    let dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);


    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0); //Set the color scheme 


    //cv.Canny(src, dst, 100, 200, 3, false); //Edge detection
    cv.threshold(src, src, 150, 255, cv.THRESH_BINARY + cv.THRESH_OTSU)[1]; //set the threshold


    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    // You can try more different parameters        
    cv.findContours(src, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);


    let contourPoints = getContourCoordinates(contours);
    src.delete(); dst.delete(); contours.delete(); hierarchy.delete();

    return contourPoints; //the full contours coodinates
}


// Method to extract coordinate from MatVector contours
function getContourCoordinates(contours) {
    let points = {};
    for (let i = 0; i < contours.size(); ++i) {
        const ci = contours.get(i); //current contour
        let contourArea = cv.contourArea(ci); //current contour area

        if(contourArea > 10){ //filter out small contours
            points[i] = [];
            for (let j = 0; j < ci.data32S.length; j += 2){
                let p = {}
                p.x = ci.data32S[j]
                p.y = ci.data32S[j+1]
                points[i].push(p)
            }
        }
    }

    return points; //the full coordinates
}
