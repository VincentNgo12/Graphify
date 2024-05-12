var DesmosCalculator = document.getElementById('calculator');
var myCalculator = Desmos.Calculator(DesmosCalculator);

function loadDesmos(fullContours){
    // initialize the desmos expressions
    let expressions = [{ id: 'slider', sliderBounds: { min: 0, max: 6.28, step: 0 }, latex: 't_{1}=0'}];

    //Get the list of coefficients
    let coefficientsList = calculateDFT(fullContours);

    for(let i=0;i<coefficientsList.length;i++){
        if(coefficientsList[i].mag.length < 10 && i>0) continue;
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



function calculateDFT(fullContours){
    let coefficientsList = [];
    
    for(const i in fullContours){
        let points = fullContours[i];
        let coefficients = DFT(points);
        
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