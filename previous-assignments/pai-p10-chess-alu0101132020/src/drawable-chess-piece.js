/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 11 PAI - Ajedrez. Programación Gráfica y Orientada a Objetos en JS.
 *  @author: Manuel Andrés Carrera Galafate
 *  @since 02/05/2020
 *  @desc Clase pieza de ajedrez dibujable.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P11-Chess/blob/master/2019-2020_p10_Chess.md
 *              Descripción del camino aleatorio.
 *              https://es.wikipedia.org/wiki/Problema_de_las_ocho_reinas
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/pai-p10-chess-alu0101132020
 *
 *  @file Fichero que contiene la implementación de la clase pieza de ajedrez dibjable
 *
 *  @version  05/05/2020 - Creación (primera versión) del código.
 */

'use strict';

let chessPieceClass = null;

if (typeof(window) === 'undefined') {
  chessPieceClass = require('../src/chess-piece');
} else {
  chessPieceClass = ChessPiece;
}

/**
 * @description Clase pieza de ajedrez dibujable en un canvas
 **/
class DrawableChessPiece extends chessPieceClass {
  /**
   * @description Constructor de una pieza.
   * @param {string} name Nombre de la pieza
   * @param {string} color Color de la pieza.
   */
  constructor(name, color) {
    super(name, color);
  }

  /**
   * @description Función que dibuja la pieza en un canvas. Para ello usa
   * su nombre y color como atributos para acceder al fichero del que recupera
   * la imagen, y a partir de el eje X (columnOfPiece) el eje Y (rowOfPiece) y el
   * tamaño de la imagen (width * height) la dibuja en el canvas de chess-board.
   * @param {int} rowOfPiece Eje Y para dibujar
   * @param {int} columnOfPiece Eje X para dibujar
   * @param {int} width Anchura de la imagen
   * @param {int} height Largo de la imagen
   */
  drawPiece(rowOfPiece, columnOfPiece, width, height) {
    const CANVAS = document.getElementById('chess-board');
    const ctx = CANVAS.getContext('2d');
    let image = new Image();
    image.src = `../img/${this.color}-${this.name}.png`;
    image.onload = () => {
      ctx.drawImage(image, columnOfPiece, rowOfPiece, width, height);
    }
  }
};

if (typeof(window) === 'undefined') {
  module.exports = DrawableChessPiece;
}