/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 9. Random Walk. Programación Gráfica y Orientada a Objetos en JS
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 19/04/2020
 *  @desc Clase punto.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P09-RandomWalk/blob/master/2019-2020_p09_RandomWalk.md
 *              Descripción del camino aleatorio.
 *              https://en.wikipedia.org/wiki/Random_walk
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-9-random-walk-alu0101132020
 *
 *  @file Fichero que contiene la implementación de la clase punto.
 *
 *  @version  19/04/2020 - Creación (primera versión) del código.
 */

'use strict';

/**
 * @description Clase punto. Contiene las coordenadas x e y que definen un
 * punto en un plano cartesiano.
 */
class Point {
  /**
   * @description Constructor de un punto que recibe 2 componentes que lo
   * definirán.
   * @param {int} x Componente x del punto
   * @param {int} y Componente y del punto
   */
  constructor (x = 0, y = 0) {
    this._x = x;
    this._y = y;
  }
  /**
   * @description Getter de la componente x de nuestro punto.
   * @return {int} Componente x
   */
  get x() {
    return this._x;
  }
  /**
   * @description Getter de la componente y de nuestro punto.
   * @return {int} Componente y
   */
  get y() {
    return this._y;
  }

  /**
   * @description Setter de la componente x de nuestro punto.
   * @param {int} x Nuevo valor que tendrá la componente x.
   */
  set x(x) {
    this._x = x;
  }

  /**
   * @description Setter de la componente y de nuestro punto.
   * @param {int} y Nuevo valor que tendrá la componente y.
   */
  set y(y) {
    this._y = y;
  }
}

if (typeof(window) === 'undefined') {
  module.exports = Point;
}
