/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 9. Random Walk. Programación Gráfica y Orientada a Objetos en JS
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 19/04/2020
 *  @desc Clases dibujables.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P09-RandomWalk/blob/master/2019-2020_p09_RandomWalk.md
 *              Descripción del camino aleatorio.
 *              https://en.wikipedia.org/wiki/Random_walk
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-9-random-walk-alu0101132020
 *
 *  @file Fichero que contiene las distintas implementaciones de clases que
 *  son dibujables desde un canvas en js. Primero se define la clase dibujable
 *  la cual recibe un canvas y a continuación se definen varias subclases para
 *  dibujar distintos elementos a partir de otras clases (por ejemplo,
 *  DrawablePoint nos permitirá dibujar puntos a partir de un objeto punto).
 *
 *  @version  19/04/2020 - Creación (primera versión) del código.
 */

'use strict';

let PointClass2 = null;
let LineClass = null;
let GridClass = null;

if (typeof(window) === 'undefined') {
  PointClass2 = require('../src/point');
  LineClass = require('../src/line');
  GridClass = require('../src/grid');
} else {
  PointClass2 = Point;
  LineClass = Line;
  GridClass = Grid;
}
const BLACK_COLOR = 'black';
const POINT_WIDTH = 4;
const EDGE_WIDTH = 2;
const START_X_OF_GRID = 500;
const START_Y_OF_GRID = 20;
const GREY_COLOR = 'grey';

/**
 * @description Clase dibujable que hará de clase padre para el resto de clases
 * dibujables.
 */
class Drawable {
  /**
   * @description Constructor que recibe un canvas a almacenar que se usará
   * en el método draw para dibujar.
   * @param {ctx} ctx Canvas del html.
   */
  constructor (ctx) {
    this._ctx = ctx;
  }

  /* istanbul ignore next */
  /**
   * @description Función común a las distintas definiciones de clases dibujables
   * y que tendrá una implementación propia en cada caso.
   */
  draw() {}

  /**
   * @description Getter del contexto de nuestra figura dibujable.
   */
  get ctx() {
    return this._ctx;
  }
}

/**
 * @description Clase punto dibujable. Hereda de dibujable y añade una función
 * para poder dibujar el punto en un canvas.
 */
class DrawablePoint extends Drawable {
  /**
   * @description Constructor que recibe el punto a dibujar y el contexto del 
   * canvas sobre el que se trabajará.
   * @param {point} point Punto que se va a dibujar.
   * @param {ctx} ctx contexto del canvas del html
   */
  constructor (point, ctx) {
    super(ctx);
    this._point = point;
    this._pointWidth = POINT_WIDTH;
    this._pointColor = BLACK_COLOR;
  }

  /**
   * @description Getter del punto de la clase
   * @return {point} Punto de la clase.
   */
  get point() {
    return this._point;
  }

  /**
   * @description Setter de la anchura del punto que se dibujará.
   * @param {int} pointWith Valor de la anchura del punto.
   */
  set pointWidth(pointWidth) {
    this._pointWidth = pointWidth;
  }

  /**
   * @description Setter del color del punto que se dibujará.
   * @param {string} pointColor Valor del color del punto.
   */
  set pointColor(pointColor) {
    this._pointColor = pointColor;
  }

  /* istanbul ignore next */
  /**
   * @description Función que dibuja el punto en el canvas.
   */
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.point.x, this.point.y, POINT_WIDTH, 0, 2 * Math.PI);
    this.ctx.fillStyle = this._pointColor;
    this.ctx.fill();
  }
}

/**
 * @description Clase línea dibujable. Hereda de dibujable y añade una función
 * para poder dibujar la línea en el canvas.
 */
class DrawableLine extends Drawable {
  /**
   * @description Constructor que recibe la línea a dibujar y el contexto del
   * canvas sobre el que se trabajará.
   * @param {line} line Línea que se dibujará.
   * @param {ctx} ctx contexto del canvas del html
   */
  constructor (line, ctx) {
    super(ctx);
    this._line = line;
    this._edgeWidth = EDGE_WIDTH;
    this._strokeColor = BLACK_COLOR;
  }

  /**
   * @description Getter de la línea de la clase
   * @return {line} Línea contenida en la clase.
   */
  get line() {
    return this._line;
  }

  /**
   * @description Setter de la anchura de la línea que se dibujará.
   * @param {int} edgeWith Valor de la anchura de la línea.
   */
  set edgeWidth(edgeWidth) {
    this._edgeWidth = edgeWidth;
  }

  /**
   * @description Setter del color de la línea que se dibujará.
   * @param {string} strokeColor Valor del color de la línea.
   */
  set strokeColor(strokeColor) {
    this._strokeColor = strokeColor;
  }

  /* istanbul ignore next */
  /**
   * @description Función que dibuja la línea en el canvas.
   */
  draw() {
    this.ctx.beginPath();
    this.ctx.lineWidth = this._edgeWidth;
    this.ctx.strokeStyle = this._strokeColor;
    this.ctx.moveTo(this.line.firstPoint.x, this.line.firstPoint.y);
    this.ctx.lineTo(this.line.secondPoint.x, this.line.secondPoint.y);
    this.ctx.closePath();
    this.ctx.stroke();
  }
}

/**
 * @description Clase cuadrícula dibujable. Hereda de dibujable y añade una 
 * función para poder dibujar la cuadrícula en el canvas.
 */
class DrawableGrid extends Drawable {
  /**
   * @description Constructor que recibe la cuadrícula a dibujar y el contexto
   * del canvas sobre el que se trabajará.
   * @param {grid} grid cuadrícula que se dibujará.
   * @param {ctx} ctx contexto del canvas del html
   */
  constructor (grid, ctx) {
    super(ctx);
    this._grid = grid;
    this._edgeWidth = EDGE_WIDTH;
    this._strokeColor = BLACK_COLOR;
    this._XOffSet = START_X_OF_GRID;
    this._YOffSet = START_Y_OF_GRID;
  }

  /**
   * @description Getter de la cuadrícula de la clase
   * @return {grid} cuadrícula contenida en la clase.
   */
  get grid() {
    return this._grid;
  }

  /* istanbul ignore next */
  /**
   * @description Función que dibuja la cuadrícula en el canvas.
   */
  draw() {
    this.drawInnerHorizontalLines();
    this.drawInnerVerticalLines();
    this.drawOuterLines();
  }


  /* istanbul ignore next */
  /**
   * @description Función que dibuja las líneas horizontales de la cuadrícula
   */
  drawInnerHorizontalLines() {
  let firstPoint = new PointClass2(this._XOffSet, this._YOffSet);
  let secondPoint =
  new PointClass2(this.grid.distanceBetweenLines * this.grid.numberOfColumns + this._XOffSet, this._YOffSet);
  for (let currentRow = 0; currentRow < this.grid.numberOfRows + 1; currentRow++) {
    firstPoint.y = currentRow * this.grid.distanceBetweenLines + this._YOffSet;
    secondPoint.y = currentRow * this.grid.distanceBetweenLines + this._YOffSet;
    let lineFromPoints = new LineClass(firstPoint, secondPoint);
    let lineToDraw = new DrawableLine(lineFromPoints, this.ctx);
    lineToDraw.strokeColor = GREY_COLOR;
    lineToDraw.edgeWidth = EDGE_WIDTH;
    lineToDraw.draw();
    }
  }

  /* istanbul ignore next */
  /**
   * @description Función que dibuja las líneas verticales de la cuadrícula
   */
  drawInnerVerticalLines() {
    let firstPoint = new Point(this._XOffSet, this._YOffSet);
    let secondPoint =
    new PointClass2(this._XOffSet, this.grid.distanceBetweenLines * this.grid.numberOfRows + this._YOffSet);
    for (let currentColumn = 0; currentColumn < this.grid.numberOfColumns + 1; currentColumn++) {
      firstPoint.x = currentColumn * this.grid.distanceBetweenLines + this._XOffSet;
      secondPoint.x = currentColumn* this.grid.distanceBetweenLines + this._XOffSet;
      let lineFromPoints = new LineClass(firstPoint, secondPoint);
      let lineToDraw = new DrawableLine(lineFromPoints, this.ctx);
      lineToDraw.strokeColor = GREY_COLOR;
      lineToDraw.edgeWidth = EDGE_WIDTH;
      lineToDraw.draw();
    }
  }

  /* istanbul ignore next */
  /**
   * @description Función que dibuja las líneas exteriores de la cuadrícula
   */
  drawOuterLines() {
    // Borde izquierdo
    let firstPoint = new Point(this._XOffSet, this._YOffSet);
    let secondPoint =
    new PointClass2(this._XOffSet, this.grid.distanceBetweenLines * this.grid.numberOfRows + this._YOffSet);
    let lineFromPoints = new LineClass(firstPoint, secondPoint);
    let lineToDraw = new DrawableLine(lineFromPoints, this.ctx);
    lineToDraw.strokeColor = BLACK_COLOR;
    lineToDraw.edgeWidth = EDGE_WIDTH * 2;
    lineToDraw.draw();
    // Borde superior
    secondPoint.x = this.grid.distanceBetweenLines * this.grid.numberOfRows + this._XOffSet;
    secondPoint.y = this._YOffSet;
    lineFromPoints = new LineClass(firstPoint, secondPoint);
    lineToDraw = new DrawableLine(lineFromPoints, this.ctx);
    lineToDraw.strokeColor = BLACK_COLOR;
    lineToDraw.edgeWidth = EDGE_WIDTH * 2;
    lineToDraw.draw();
    // Borde derecho
    firstPoint.x = this.grid.distanceBetweenLines * this.grid.numberOfRows + this._XOffSet;
    firstPoint.y = this.grid.distanceBetweenLines * this.grid.numberOfColumns + this._YOffSet;
    lineFromPoints = new LineClass(firstPoint, secondPoint);
    lineToDraw = new DrawableLine(lineFromPoints, this.ctx);
    lineToDraw.strokeColor = BLACK_COLOR;
    lineToDraw.edgeWidth = EDGE_WIDTH * 2;
    lineToDraw.draw();
    // Borde inferior
    secondPoint.x = this._XOffSet;
    secondPoint.y = this.grid.distanceBetweenLines * this.grid.numberOfColumns + this._YOffSet;
    lineFromPoints = new LineClass(firstPoint, secondPoint);
    lineToDraw = new DrawableLine(lineFromPoints, this.ctx);
    lineToDraw.strokeColor = BLACK_COLOR;
    lineToDraw.edgeWidth = EDGE_WIDTH * 2;
    lineToDraw.draw();
    }
  }

if (typeof(window) === 'undefined') {
  module.exports = { Drawable, DrawablePoint, DrawableLine, DrawableGrid } ;
}