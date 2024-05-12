function getContours(imageURL){
    let src = cv.imread(imageURL);
    let dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
    cv.threshold(src, src, 127, 255, cv.THRESH_BINARY);
    // You can try more different parameters
    cv.Canny(src, dst, 50, 100, 3, false);
    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    // You can try more different parameters
    cv.findContours(src, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);

    src.delete(); dst.delete(); hierarchy.delete();

    return contours; //return the contours
}