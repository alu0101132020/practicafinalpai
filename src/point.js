/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 13. Bouncing Ball. Programación Gráfica, Orientada a Objetos y dirigida por eventos en JS.
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 13/05/2020
 *  @desc Clase punto.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P13-BouncingBall/blob/master/2019-2020_p13_BouncingBall.md
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/pai-p13-bouncing-ball-alu0101132020
 *
 *  @file Fichero que contiene la implementación de la clase punto.
 *
 *  @version  13/05/2020 - Creación (primera versión) del código.
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
