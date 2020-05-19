const EDGE_WIDTH_SHAPES = 20;

class Shape {
  /**
   * @description Constructor de una figura. Toda figura tendrá un centro,
   * y de esta heredarán las instancias concretas de figuras que tendrán
   * un método propio para dibujarse.
   */
  constructor(point) {
    this.center = point;
  }
  drawShape() {}
};

class Circle extends Shape {
  /**
   * @description Constructor que recibe un centro y un
   * radio para definir un círculo
   * @param {Point} point - Punto central
   * @param {int} radius - Radio del círculo
   */
  constructor(point, radius) {
    super(point);
    this._radius = radius;
  }
  
  drawShape (ctx, color = BLACK_COLOR) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.center.x, this.center.y, this._radius, 0, 2 * Math.PI);
    ctx.lineWidth = EDGE_WIDTH_SHAPES;
    ctx.strokeStyle = BLACK_COLOR;
    ctx.stroke();
    ctx.fill();
  }

  drawShapeNoFill (ctx, color = BLACK_COLOR) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.center.x, this.center.y, this._radius, 0, 2 * Math.PI);
    ctx.lineWidth = EDGE_WIDTH_SHAPES;
    ctx.strokeStyle = BLACK_COLOR;
    ctx.stroke();
  }
};

class Square extends Shape {
  /**
   * @description Constructor que recibe un cuadrado y un
   * lado para definir un cuadrado.
   * @param {Point} point - Punto central
   * @param {int} side - Lado del cuadrado
   */
  constructor(point, side) {
    super(point);
    this._side = side;
  }
  drawShape (ctx, color = BLACK_COLOR) {
    ctx.beginPath();
    ctx.moveTo(this.center.x - this._side / 2, this.center.y - this._side / 2);
    ctx.lineTo(this.center.x - this._side / 2 + this._side, this.center.y - this._side / 2);
    ctx.moveTo(this.center.x - this._side / 2 + this._side, this.center.y - this._side / 2);
    ctx.lineTo(this.center.x - this._side / 2 + this._side, this.center.y - this._side / 2 + this._side);
    ctx.moveTo(this.center.x - this._side / 2 + this._side, this.center.y - this._side / 2 + this._side);
    ctx.lineTo(this.center.x - this._side / 2, this.center.y - this._side / 2 + this._side);
    ctx.moveTo(this.center.x - this._side / 2, this.center.y - this._side / 2 + this._side);
    ctx.lineTo(this.center.x - this._side / 2, this.center.y - this._side / 2);
    ctx.closePath();

    ctx.lineWidth = EDGE_WIDTH_SHAPES;
    ctx.strokeStyle = BLACK_COLOR;
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
  }
}

class Rectangle extends Shape {
  /**
   * @description Constructor que recibe un cuadrado y un
   * lado para definir un cuadrado.
   * @param {Point} point - Punto central
   * @param {int} side - Lado del cuadrado
   */
  constructor(point, side1, side2) {
    super(point);
    this._side1 = side1;
    this._side2 = side2
  }
  drawShape (ctx, color = BLACK_COLOR) {
    ctx.beginPath();
    ctx.moveTo(this.center.x - this._side1 / 2, this.center.y - this._side2 / 2);
    ctx.lineTo(this.center.x - this._side1 / 2 + this._side1, this.center.y - this._side2 / 2);
    ctx.moveTo(this.center.x - this._side1 / 2 + this._side1, this.center.y - this._side2 / 2);
    ctx.lineTo(this.center.x - this._side1 / 2 + this._side1, this.center.y - this._side2 / 2 + this._side2);
    ctx.moveTo(this.center.x - this._side1 / 2 + this._side1, this.center.y - this._side2 / 2 + this._side2);
    ctx.lineTo(this.center.x - this._side1 / 2, this.center.y - this._side2 / 2 + this._side2);
    ctx.moveTo(this.center.x - this._side1 / 2, this.center.y - this._side2 / 2 + this._side2);
    ctx.lineTo(this.center.x - this._side1 / 2, this.center.y - this._side2 / 2);
    ctx.closePath();

    ctx.lineWidth = EDGE_WIDTH_SHAPES;
    ctx.strokeStyle = BLACK_COLOR;
    ctx.stroke();
    ctx.fillStyle = BLACK_COLOR;
    ctx.fill();
  }
}


class Arc extends Shape {
  /**
   * @description Constructor que recibe un cuadrado y un
   * lado para definir un cuadrado.
   * @param {Point} point - Punto central
   * @param {int} side - Lado del cuadrado
   */
  constructor(point, startDegree, endDegree, radius) {
    super(point);
    this._startDegree = startDegree;
    this._endDegree = endDegree;
    this._radius = radius;
  }
  drawShape (ctx, color = BLACK_COLOR) {
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this._radius, this._startDegree, this._endDegree);
    ctx.stroke();
  }
}