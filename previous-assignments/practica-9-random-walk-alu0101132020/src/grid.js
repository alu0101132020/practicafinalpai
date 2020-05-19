/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 9. Random Walk. Programación Gráfica y Orientada a Objetos en JS
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 19/04/2020
 *  @desc Clase cuadrícula.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P09-RandomWalk/blob/master/2019-2020_p09_RandomWalk.md
 *              Descripción del camino aleatorio.
 *              https://en.wikipedia.org/wiki/Random_walk
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-9-random-walk-alu0101132020
 *
 *  @file Fichero que contiene la implementación de la clase cuadrícula.
 *
 *  @version  19/04/2020 - Creación (primera versión) del código.
 */

'use strict';

/**
 * @description Clase cuadrícula. Nuestra cuadrícula estará definida por
 * una serie de líneas dispuestas de forma matricial (líneas en filas
 * y en columnas.)
 */
class Grid {
  /**
   * @description Constructor de una cuadrícula. Recibe 3 parámetros, las filas
   * que tendrá la cuadrícula, las columnas que tendrá la cuadrícula, y la
   * distancia que habrá entre cada línea de la cuadrícula.
   * @param {int} numberOfRows Número de filas
   * @param {int} numberOfColumns Número de columnas
   * @param {int} distanceBetweenLines Distancia en píxeles entre líneas.
   */
  constructor (numberOfRows = 1, numberOfColumns = 1, distanceBetweenLines = 100) {
    if (numberOfColumns >= 1 && numberOfRows >= 1 && distanceBetweenLines >= 1) {
      this._numberOfRows = numberOfRows;
      this._numberOfColumns = numberOfColumns;
      this._distanceBetweenLines = distanceBetweenLines;
    } else {
      throw 'Error creating grid';
    }
  }
  /**
   * @description Getter del número de filas que contiene la cuadrícula.
   * @return {int} Número de filas
   */
  get numberOfRows() {
    return this._numberOfRows;
  }
  /**
   * @description Getter del número de columnas que contiene la cuadrícula.
   * @return {int} Número de columnas
   */
  get numberOfColumns() {
    return this._numberOfColumns;
  }
    /**
   * @description Getter de la distancia en píxeles que hay entre 2 líneas
   * de la cuadrícula.
   * @return {int} Distancia en píxeles entre líneas.
   */
  get distanceBetweenLines() {
    return this._distanceBetweenLines;
  }
}

if (typeof(window) === 'undefined') {
  module.exports = Grid;
}