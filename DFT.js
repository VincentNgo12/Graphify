function DFT(points) {
    if (!Array.isArray(points)) {
      throw new TypeError("Argument 'points' must be an array");
    }
    
    const N = points.length;
    const m = Math.floor(N / 2);
    let coefficients = [];
  
    // Convert points to Complex numbers
    const values = points.map(point => new Complex(point.x, point.y));

    for (let k = -m; k < m; k++) {
      let sum = new Complex(0, 0);

      for (let n = 0; n < N; n++) {
        const angle = k * n * ((2 * Math.PI) / N);
        const exponentialTerm = new Complex(Math.cos(angle), -Math.sin(angle));
        sum.add(values[n].multiply(exponentialTerm));
      }

      coefficients.push(new FourierCoefficient(sum, k, N));
    }
    
    coefficients = sortCoefficients(coefficients); //sort coefficients
    return coefficients;
}



class FourierCoefficient {
    constructor(complex, frequency, N) {
      if (!(complex instanceof Complex)) {
        throw new TypeError("Argument 'complex' must be a Complex number");
      }
  
      const real = complex.re / N;
      const imag = complex.im / N;
      this.freq = frequency;
      this.phase = Math.atan2(imag, real);
      this.mag = Math.sqrt(real * real + imag * imag);
    }
}


function sortCoefficients(coefficients) {
    if (!Array.isArray(coefficients)) {
      throw new TypeError("Argument 'coefficients' must be an array");
    }
  
    return coefficients.sort((a, b) => b.magnitude - a.magnitude);
}

  


class Complex {
    constructor(real, imag) {
      this.re = real;
      this.im = imag;
    }
  
    add(other) {
      if (other instanceof Complex) {
        this.re += other.re;
        this.im += other.im;
      } else {
        throw new TypeError("Argument must be a Complex number");
      }
    }
  
    multiply(other) {
      if (other instanceof Complex) {
        const newReal = this.re * other.re - this.im * other.im;
        const newImag = this.re * other.im + this.im * other.re;
        return new Complex(newReal, newImag);
      } else {
        throw new TypeError("Argument must be a Complex number");
      }
    }
  
    toString() {
      const imagStr = this.im >= 0 ? `+ ${this.im}i` : `- ${Math.abs(this.im)}i`;
      return `${this.re}${imagStr}`;
    }
  }
