/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 11 PAI - Ajedrez. Programación Gráfica y Orientada a Objetos en JS.
 *  @author: Manuel Andrés Carrera Galafate
 *  @since 02/05/2020
 *  @desc Clase tablero de ajedrez.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P11-Chess/blob/master/2019-2020_p10_Chess.md
 *              Descripción del camino aleatorio.
 *              https://es.wikipedia.org/wiki/Problema_de_las_ocho_reinas
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/pai-p10-chess-alu0101132020
 *
 *  @file Fichero que contiene la implementación de la clase tablero de ajedrez.
 *
 *  @version  02/05/2020 - Creación (primera versión) del código.
 */

'use strict';

/**
 * @description Clase tablero de ajedrez.
 */
class ChessBoard {
  /**
   * @description Constructor de un tablero que recibe 2 parámetros que lo
   * definirán, siendo la altura y anchura del mismo. El tablero contendrá
   * como atributos una altura, una anchura y un conjunto de casillas.
   * @param {int} chessBoardWidth Anchura del tablero
   * @param {int} chessBoardLength Altura del tablero
   */
  constructor (chessBoardWidth = 8, chessBoardLength = 8) {
    this.width = chessBoardWidth;
    this.length = chessBoardLength;
    this.squares = [];
    for (let numberOfRows = 0; numberOfRows < chessBoardLength; numberOfRows++) {
      this.squares[numberOfRows] = [];
      for (let numberOfColums = 0; numberOfColums < chessBoardWidth; numberOfColums++) {
        this.squares[numberOfRows][numberOfColums] = false;
      }
    }
  }
}


if (typeof(window) === 'undefined') {
  module.exports = ChessBoard;
}
