class Complex {
    constructor(real, imag) {
      this.re = real;
      this.im = imag;
    }
  
    add(other) {
      if (other instanceof Complex) {
        this.re += other.real;
        this.im += other.imag;
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
      const imagStr = this.imag >= 0 ? `+ ${this.imag}i` : `- ${Math.abs(this.imag)}i`;
      return `${this.real}${imagStr}`;
    }
  }