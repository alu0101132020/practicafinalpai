
describe("complexNumber", function() {
  it ("should create a complex number", function() {
    const complex = new ComplexNumber(3, 9);
    const partReal = complex.real;
    const partImaginary = complex.imaginary;

    expect(partReal).to.equal(3);
    expect(partImaginary).to.equal(9);
  })

  it("should product two complexs numbers", function() {
    const firstOperand = new ComplexNumber(10, 5);
    const secondOperand = new ComplexNumber(6, 8);
    const result = firstOperand.multiplication(secondOperand);

    expect(result.real).to.equal(20);
    expect(result.imaginary).to.equal(110);
  })

  it("should add two complexs numbers", function() {
    const firstOperand = new ComplexNumber(1, 3);
    const secondOperand = new ComplexNumber(6, 8);
    const result = firstOperand.addition(secondOperand);

    expect(result.real).to.equal(7);
    expect(result.imaginary).to.equal(11);
  })

  it("should do the module of a complex number", function() {
    const complex = new ComplexNumber(3, 4);
    const result = complex.module();

    expect(result).to.equal(5);
  })
});

describe("Point", function() {
  it ("should create a point.", function() {
    const point = new Point(2, 7);
    const x = point.x;
    const y = point.y;

    expect(x).to.equal(2);
    expect(y).to.equal(7);
  })
});


describe("Triangle", function() {
  it ("should create a triangle.", function() {
    const point1 = new Point(2, 7);
    const point2 = new Point(5, 6);
    const point3 = new Point(4, 9);
    const triangle = new Triangle(point1, point2, point3);

    const xFromPointOne = triangle.x.x
    const yFromPointOne = triangle.x.y

    expect(xFromPointOne).to.equal(2);
    expect(yFromPointOne).to.equal(7);
  })
});