/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 8. Poker. OOP
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 09/04/2020
 *  @desc Implementación de la solución al ejercicio 2.2 propuesto en la hora de prácticas
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P08-Poker/blob/master/2019-2020_p08_Poker.md
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-8-poker-alu0101132020
 *
 *  @file Fichero que contiene la solución al ejercicio 2.2 de la hora de prácticas.
 *
 *  @version  09/04/2020 - Creación (primera versión) del código.
 */

'use strict';

const WIDTH_OF_CANVAS = 720;
const HEIGHT_OF_CANVAS = 720;
const LINE_WIDTH = 2;
const BLACK_COLOR = 'black';
const MY_COLORS = ['white', 'gainsboro', 'lightgray', 'gray', 'dimgray','black' ]
const NUMBER_OF_SHAPES = 6;
const OFFSET_FROM_CORNERS = WIDTH_OF_CANVAS * 0.1;
const EDGE_WIDTH = 5;

const draw = () => {
  const EXAMPLE_POINT = new Point(0,0);
  const DISTANCE_BETWEEN_CIRCLES = (WIDTH_OF_CANVAS - 2 * OFFSET_FROM_CORNERS) / 6;
  const RADIUS_FROM_CIRCLES = DISTANCE_BETWEEN_CIRCLES / 2;
  const MY_SHAPES = [
    new Circle(EXAMPLE_POINT, RADIUS_FROM_CIRCLES),
    new Circle(EXAMPLE_POINT, RADIUS_FROM_CIRCLES),
    new Square(EXAMPLE_POINT, 70),
    new Rectangle(EXAMPLE_POINT, 70, 100),
    new Square(EXAMPLE_POINT, 70),
    new Rectangle(EXAMPLE_POINT, 70, 100)
  ];

  const canvas = document.getElementById('ejercicio22');
  canvas.width = WIDTH_OF_CANVAS;
  canvas.height = HEIGHT_OF_CANVAS;
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    for (let currentShape = 0; currentShape < MY_SHAPES.length; currentShape++) {
      const coordinate = DISTANCE_BETWEEN_CIRCLES * currentShape + OFFSET_FROM_CORNERS;
      const myCenter = new Point(coordinate, coordinate);
      MY_SHAPES[currentShape].center = myCenter;
      MY_SHAPES[currentShape].drawShape(ctx, MY_COLORS[currentShape]);
    }
  }
}

class Point {
  /**
   * @description Constructor que recibe dos coordenadas para
   * crear un punto.
   * @param {int} x - Primera componente del punto
   * @param {int} y - Segunda componente del punto
   */
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
};

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
    ctx.lineWidth = EDGE_WIDTH;
    ctx.strokeStyle = BLACK_COLOR;
    ctx.stroke();
    ctx.fill();
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

    ctx.lineWidth = EDGE_WIDTH;
    ctx.strokeStyle = BLACK_COLOR;
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
  }
}

class Rectangle {
  /**
   * @description Constructor que recibe un cuadrado y un
   * lado para definir un cuadrado.
   * @param {Point} point - Punto central
   * @param {int} side - Lado del cuadrado
   */
  constructor(point, side1, side2) {
    this.center = point;
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

    ctx.lineWidth = EDGE_WIDTH;
    ctx.strokeStyle = BLACK_COLOR;
    ctx.stroke();
    ctx.fillStyle = BLACK_COLOR;
    ctx.fill();
  }
}

class Triangle extends Shape {
  /**
   * @description Constructor que recibe tres puntos y con ello
   * conforma un triángulo
   * @param {Point} firstPoint - Primer punto que forma el triángulo
   * @param {Point} secondPoint - Segundo punto que forma el triángulo
   * @param {Point} thirdPoint - Tercer punto que forma el triángulo.
   */
  constructor (firstPoint, secondPoint, thirdPoint) {
    super(firstPoint)
    this.y = secondPoint;
    this.z = thirdPoint;
  }
  drawShape(ctx, color = BLACK_COLOR) {
    ctx.beginPath();
    ctx.moveTo(this.center.x, this.center.y);
    ctx.lineTo(this.y.x, this.y.y);
    ctx.lineTo(this.z.x, this.z.y);
    ctx.closePath();
    // Dibujo del exterior del triángulo
    ctx.lineWidth = EDGE_WIDTH;
    ctx.strokeStyle = BLACK_COLOR;
    ctx.stroke();
    // Pintar el interior.
    ctx.fillStyle = color;
    ctx.fill();
  }
};