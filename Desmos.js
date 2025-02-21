/* Code the handle the graphing using Demos API */


var calculatorPage = document.getElementById('calculator-page');
var DesmosCalculator = document.getElementById('calculator');
var myCalculator = Desmos.Calculator(DesmosCalculator);


// Function to load the Desmos calculator with the Fourier coefficients
// and the parametric equations for each contour
function loadDesmos(fullContours){
    // initialize the desmos expressions
    let expressions = [{ id: 'slider', sliderBounds: { min: 0, max: 6.28, step: 0 }, latex: 't_{1}=6.28'}];

    //Get the list of coefficients
    let coefficientsList = calculateDFT(fullContours);

    for(let i=0;i<coefficientsList.length;i++){
        expressions.push(
            { id: `listAmp${i}`, latex: `R_{p${i}}=[${coefficientsList[i].mag}]` },
            { id: `listFreq${i}`, latex: `F_{p${i}}=[${coefficientsList[i].freq}]` },
            { id: `listPhase${i}`, latex: `A_{p${i}}=[${coefficientsList[i].phase}]` },
            { id: `parametric${i}`, latex: `\\left(\\sum _{i=1}^{\\operatorname{length}\\left(R_{p${i}}\\right)}R_{p${i}}\\left[i\\right]\\cos \\left(F_{p${i}}\\left[i\\right]tt_1+A_{p${i}}\\left[i\\right]\\right),-\\sum _{i=1}^{\\operatorname{length}\\left(R_{p${i}}\\right)}R_{p${i}}\\left[i\\right]\\sin \\left(F_{p${i}}\\left[i\\right]tt_1+A_{p${i}}\\left[i\\right]\\right)\\right)`},
        )
    }

    myCalculator.setExpressions(expressions);
    return;
}



// Function to calculate the Discrete Fourier Transform 
// (transform from coordinates to Fourier coefficients for each contour)
function calculateDFT(fullContours){
    let coefficientsList = [];
    
    // Loop through each contours
    for(const i in fullContours){
        let points = fullContours[i];
        let coefficients = DFT(points); //Use the DFT() function to calculate the coefficients
        
        // consecutive array of current coefficients properties 
        let mag = [];
        let freq = [];
        let phase = [];

        // fill the array with coeffictients properties
        coefficients.forEach(coefficient => {
            mag.push(coefficient.mag);
            freq.push(coefficient.freq);
            phase.push(coefficient.phase);
        })

        // current coefficients
        let c = {};
        c.mag = mag;
        c.freq = freq;
        c.phase = phase;

        coefficientsList.push(c);
    }


    return coefficientsList;
}


// Close the calculator page
document.getElementById('closeCalculator').addEventListener('click', () => {
    calculatorPage.style.display = "none";
    document.querySelector(".page").style.display = "flex";
    myCalculator.destroy();
    myCalculator = Desmos.Calculator(DesmosCalculator);
})