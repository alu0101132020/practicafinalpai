/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 9. Random Walk. Programación Gráfica y Orientada a Objetos en JS
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 19/04/2020
 *  @desc Clase línea.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P09-RandomWalk/blob/master/2019-2020_p09_RandomWalk.md
 *              Descripción del camino aleatorio.
 *              https://en.wikipedia.org/wiki/Random_walk
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-9-random-walk-alu0101132020
 *
 *  @file Fichero que contiene la implementación de la clase línea
 *
 *  @version  19/04/2020 - Creación (primera versión) del código.
 */

'use strict';

let PointClass = null;

if (typeof(window) === 'undefined') {
  PointClass = require('../src/point');
} else {
  PointClass = Point;
}

/**
 * @description Clase línea. Contiene dos puntos los cuales definen nuestra
 * línea
 */
class Line {
  /**
   * @description Constructor de una línea, la cual recibe 2 puntos.
   * @param {Point} firstPoint Primer punto de la línea
   * @param {Point} secondPoint Segundo punto de la línea
   */
  constructor (firstPoint = new PointClass(0, 0), secondPoint = new PointClass(0, 0)) {
    this._firstPoint = firstPoint;
    this._secondPoint = secondPoint;
  }
  /**
   * @description Getter del primer punto de la línea.
   * @return {int} Primer punto de la línea
   */
  get firstPoint() {
    return this._firstPoint;
  }
  /**
   * @description Getter del segundo punto de la línea
   * @return {Point} Segundo punto de la línea.
   */
  get secondPoint() {
    return this._secondPoint;
  }
}

if (typeof(window) === 'undefined') {
  module.exports = Line;
}