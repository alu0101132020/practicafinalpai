/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 9. Random Walk. Programación Gráfica y Orientada a Objetos en JS
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 19/04/2020
 *  @desc Clase random walk.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P09-RandomWalk/blob/master/2019-2020_p09_RandomWalk.md
 *              Descripción del camino aleatorio.
 *              https://en.wikipedia.org/wiki/Random_walk
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-9-random-walk-alu0101132020
 *
 *  @file Fichero que contiene la implementación de la clase random walk.
 *
 *  @version  19/04/2020 - Creación (primera versión) del código.
 */

'use strict';

const RED_COLOR = 'red';
const BLUE_COLOR = 'blue';

let DrawableClass = null;
let PointClass3 = null;
let LineClass2 = null;
let DrawablePointClass = null;
let DrawableLineClass = null;

if (typeof(window) === 'undefined') {
  PointClass3 = require('../src/point');
  LineClass2 = require('../src/line');
  DrawablePointClass = require('../src/drawable-elements').DrawablePoint;
  DrawableLineClass = require('../src/drawable-elements').DrawableLine
  DrawableClass = require('../src/drawable-elements').Drawable;
} else {
  PointClass3 = Point;
  LineClass2 = Line;
  DrawablePointClass = DrawablePoint;
  DrawableLineClass = DrawableLine;
  DrawableClass = Drawable;
}

/**
 * @description Clase random walk. Contiene una cuadrícula dibujable y
 * recursivamente va pintando líneas rojas en el canvas hasta salirse de la
 * cuadrícula.
 */
class RandomWalkOnGrid extends DrawableClass {
  /**
   * @description Constructor. Recibe una cuadrícula y un contexto. A partir
   * de la cuadrícula almacena los siguientes parámetros que tienen información
   * necesaria para hacer el camino aleatorio: Componente X e Y, que inicialmente
   * estara en el centro de la cuadrícula, el punto actual, y la distancia del
   * segmento necesaria para formar la línea
   * @param {grid} grid Cuadrícula de la que se extrae información
   * @param {context} ctx Contexto del canvas
   */
  constructor(grid, ctx) {
    super(ctx);
    this._grid = grid;
    const halfX = Math.floor(grid.grid.numberOfRows / 2);
    const quartX = Math.floor(halfX / 2);
    this._positionX1 = Math.floor(halfX - quartX);
    this._positionX2 = Math.ceil(halfX + quartX);
    this._positionY1 = Math.floor(grid.grid.numberOfColumns / 2);
    this._positionY2 = Math.ceil(grid.grid.numberOfColumns / 2);
    this._currentPoint = new PointClass3
      (this._positionX1 * grid.grid.distanceBetweenLines + grid._XOffSet,
      this._positionY1 * grid.grid.distanceBetweenLines + grid._YOffSet,
      this._positionX1, this._positionY1);
    this._currentPoint2 = new PointClass3
    (this._positionX2 * grid.grid.distanceBetweenLines + grid._XOffSet,
    this._positionY2 * grid.grid.distanceBetweenLines + grid._YOffSet,
    this._positionX2, this._positionY2);
    this._distanceSegment = grid.grid.distanceBetweenLines;
    grid.draw();
  }

  /**
   * @description Getter de la cuadrícula almacenada.
   * @return Cuadrícula.
   */
  get grid() {
    return this._grid;
  }

  /**
   * @description Función principal del random walker. Cada 500 ms genera un
   * nuevo punto en referencia al punto actual (comenzando desde el central) y
   * va formando una línea en el canvas entre estos dos. A continuación cambia 
   * el punto actual a el nuevo y repite el proceso hasta que lleguemos a alguno
   * de los bordes de la cuadrícula.
   */
  async run () {
    await this.sleep(500);
    let newPoint = this.generateNewRandomPoint(this._currentPoint);
    const newLine = new DrawableLineClass(new LineClass2(this._currentPoint, newPoint), this.ctx);
    // const drawablePoint = new DrawablePointClass(newPoint, this.ctx);
    newLine.strokeColor = RED_COLOR;
    const DOUBLE_EDGE_WIDTH = newLine.edgeWidth * 2.5;
    newLine.edgeWidth = DOUBLE_EDGE_WIDTH;
    // drawablePoint.draw();
    newLine.draw();
    let newPoint2 = this.generateNewRandomPoint(this._currentPoint2);
    const newLine2 = new DrawableLineClass(new LineClass2(this._currentPoint2, newPoint2), this.ctx);
    // const drawablePoint2 = new DrawablePointClass(newPoint2, this.ctx);
    newLine2.strokeColor = BLUE_COLOR;
    newLine2.edgeWidth = DOUBLE_EDGE_WIDTH;
    // drawablePoint2.draw();
    newLine2.draw();
    this._currentPoint = newPoint;
    this._currentPoint2 = newPoint2;
    // Los ifs están anidados porque no está funcionando con un and.
    if (!this.outOfGrid(this._currentPoint)) {
      if (!(this.outOfGrid(this._currentPoint2))) {
        this.run();
      }
    }
  }

  /**
   * @description Función que genera un nuevo punto y lo retorna. Para ello
   * genera un número aleatorio entre 0 y 4 (sin incluir el 4) y en base a este
   * coge como referencia el punto actual en el que estamos, y le resta
   * o suma a la componente x o y de nuestro punto la distancia de segmento
   * definida en la clase. La línea formada entre el nuevo punto y el actual
   * hará el nuevo camino aleatorio.
   * @return {point} Nuevo punto generado.
   */
  generateNewRandomPoint(currentPoint) {
    const sideToMove = Math.floor(Math.random() * 4);
    let newPoint = new PointClass3;
    switch (sideToMove) {
      case 0:
        // Caso izquierda
        newPoint.x = currentPoint.x - this._distanceSegment;
        newPoint.y = currentPoint.y;
        newPoint.positionX = currentPoint.positionX - 1;
        newPoint.positionY = currentPoint.positionY;
        break;
      case 1:
        // Caso derecha
        newPoint.x = currentPoint.x + this._distanceSegment;
        newPoint.y = currentPoint.y;
        newPoint.positionX = currentPoint.positionX + 1;
        newPoint.positionY = currentPoint.positionY;
        break;
      case 2:
        // Caso arriba
        newPoint.x = currentPoint.x;
        newPoint.y = currentPoint.y - this._distanceSegment;
        newPoint.positionY = currentPoint.positionY - 1;
        newPoint.positionX = currentPoint.positionX;
        break;
      case 3:
        // Caso abajo
        newPoint.x = currentPoint.x;
        newPoint.y = currentPoint.y + this._distanceSegment;
        newPoint.positionY = currentPoint.positionY + 1;
        newPoint.positionX = currentPoint.positionX;
        break;
    }
    return newPoint;
  }


  /**
   * @description Función que comprueba si el punto actual se sale de la cuadrícula.
   * @return {bool} Verdadero si nos hemos salido falso si no.
   */
  outOfGrid(currentPoint) {
    if (currentPoint.positionX >= this._grid.grid.numberOfRows || 
      currentPoint.positionX <= 0 || 
      currentPoint.positionY >= this._grid.grid.numberOfColumns ||
      currentPoint.positionY <= 0) {
        return true;
      }
    return false;
  }

  /* istanbul ignore next */
  /**
   * @description Función que facilita las distintas pausas del código.
   * @param {int} msToWait Número de milissegundo a esperar.
   */
  sleep (msToWait)  {
    return new Promise(resolve => setTimeout(resolve, msToWait))
  }
}