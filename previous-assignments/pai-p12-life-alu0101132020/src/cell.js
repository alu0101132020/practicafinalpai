/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 12. El juego de la vida. Programación Gráfica, Orientada a Objetos y dirigida por eventos en JS.
 *  @author: Manuel Andrés Carrera Galafate
 *  @since 09/05/2020
 *  @desc Clase célula del juego de la vida.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P12-Life/blob/master/2019-2020_p12_Life.md
 *              Descripción del camino aleatorio.
 *              https://en.wikipedia.org/wiki/Conway's_Game_of_Life
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/pai-p12-life-alu0101132020
 *
 *  @file Fichero que contiene la implementación de la clase célula del juego de la vida.
 *
 *  @version  09/05/2020 - Creación (primera versión) del código.
 */

'use strict';
const ALIVE_COLOR_CELL = 'white';
const DEAD_COLOR_CELL = 'black';
const DEAD_CELL = 0;
const ALIVE_CELL = 1;

/**
 * @description Clase célula del juego de la vida. Una célula en el juego de la
 * vida vendrá definida por un estado que será 1 si está viva o 0 si está muerta,
 * una posición (definida por una coordenada X y una coordenada Y) y un color.
 */
class LifeCell {
  /**
   * @description Constructor de una célula.
   * @param {bool} state 1 indica que la célula está viva, 0 que está muerta.
   * @param {int} x coordenada del eje x en un sistema de coordenadas.
   * @param {int} y coordenada del eje y en un sistema de coordenadas.
   * @param {string} color color de la célula.
   */
  constructor (state = DEAD_CELL, x = 0, y = 0, color = DEAD_COLOR_CELL) {
    this.state = state;
    this.x = x;
    this.y = y;
    this.color = color;
  }

  /**
   * @description Función que cambia la célula al estado que al que se encuentra
   * se le indique
   * @param {int} state Estao al que tendrá que pasar la célula.
   */
  changeState(state) {
    if (state === DEAD_CELL) {
      this.state = state;
      this.color = DEAD_COLOR_CELL;
    } else {
      this.state = state;
      this.color = ALIVE_COLOR_CELL;
    }
  }
}

if (typeof(window) === 'undefined') {
  module.exports = LifeCell;
}
