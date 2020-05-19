/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 11 PAI - Ajedrez. Programación Gráfica y Orientada a Objetos en JS.
 *  @author: Manuel Andrés Carrera Galafate
 *  @since 02/05/2020
 *  @desc Clase pieza de ajedrez
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P11-Chess/blob/master/2019-2020_p10_Chess.md
 *              Descripción del camino aleatorio.
 *              https://es.wikipedia.org/wiki/Problema_de_las_ocho_reinas
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/pai-p10-chess-alu0101132020
 *
 *  @file Fichero que contiene la implementación de la clase pieza de ajedrez
 *
 *  @version  05/05/2020 - Creación (primera versión) del código.
 */

'use strict';

/**
 * @description Clase pieza de ajedrez, que se define por el tipo de pieza y 
 * un color
 */
class ChessPiece {
  /**
   * @description Constructor de una pieza de ajedrez, que recibirá el nombre
   * del tipo de pieza y el color de la pieza.
   * @param {string} name nombre de la pieza
   * @param {string} color color de la pieza
   */
  constructor (name = 'pawn', color = 'white') {
    this.name = name;
    this.color = color
  }
}

if (typeof(window) === 'undefined') {
  module.exports = ChessPiece;
}