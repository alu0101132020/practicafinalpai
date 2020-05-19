/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 11 PAI - Ajedrez. Programación Gráfica y Orientada a Objetos en JS.
 *  @author: Manuel Andrés Carrera Galafate
 *  @since 02/05/2020
 *  @desc Clase tablero de ajedrez que se puede dibujar.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P11-Chess/blob/master/2019-2020_p10_Chess.md
 *              Descripción del camino aleatorio.
 *              https://es.wikipedia.org/wiki/Problema_de_las_ocho_reinas
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/pai-p10-chess-alu0101132020
 *
 *  @file Fichero que contiene la implementación de la clase tablero de ajedrez
 *  con función de dibujado.
 *
 *  @version  02/05/2020 - Creación (primera versión) del código.
 */

'use strict';

const BLACK = 'black';
const BROWN = '#946f51';
const WHITE = '#F0D9B5';

let ChessBoardClass2 = null;
let ChessPieceClass = null;

if (typeof(window) === 'undefined') {
  ChessBoardClass = require('../src/chess-board');
  ChessPieceClass = require ('../src/drawable-chess-piece');
} else {
  ChessBoardClass2 = ChessBoard;
  ChessPieceClass = DrawableChessPiece;
}

/**
 * @description Clase tablero de ajedrez de reinas. Básicamente modifica el método
 * printBoard para trabajar en un canvas.
 */
class DrawableChessBoard extends ChessBoardClass2 {
  /**
   * @description Constructor de un tablero que recibe 2 parámetros que lo
   * definirán, siendo la altura y anchura del mismo. El tablero contendrá
   * como atributos una altura, una anchura, un conjunto de casillas y un contador
   * de soluciones. En el tablero de reinas en cada casilla habrá un booleano
   * que nos indicará si hay una reina (true) o si no la hay (false).
   * @param {int} chessBoardWidth Anchura del tablero
   * @param {int} chessBoardLength Altura del tablero
   */
  constructor (chessBoardWidth = 8, chessBoardLength = 8) {
    super(chessBoardWidth, chessBoardLength);
  }

  /**
  * @desc Imprime el tablero y las piezas por pantalla de un ajedrez normal.
  */
  printBoard () {
    this.drawEmptyBoard();
    this.drawPieces();
  };

  /**
   * @description Función que dibuja un tablero vacío.
   */
  drawEmptyBoard () {
    const CANVAS = document.getElementById('chess-board');
    const ctx = CANVAS.getContext('2d');
    const topLeftBoardX = CANVAS.width / 16;
    const topLeftBoardY = CANVAS.height / 16;
    ctx.fillStyle = BLACK;
    ctx.fillRect(topLeftBoardX - 5, topLeftBoardY - 5, topLeftBoardX * 14 + 10, topLeftBoardY * 14 + 10);
    ctx.fillStyle = BROWN;
    ctx.fillRect(topLeftBoardX, topLeftBoardY, topLeftBoardX * 14, topLeftBoardY * 14);
    const borderTopLeftBoardX = topLeftBoardX * 2;
    const borderTopLeftBoardY = topLeftBoardY * 2;
    ctx.fillStyle = WHITE;
    ctx.fillRect(borderTopLeftBoardX, borderTopLeftBoardY, topLeftBoardX * 12, topLeftBoardY * 12);
    const startRowIndex = topLeftBoardX * 2 + 5;
    const startColIndex = topLeftBoardY * 2 + 5;
    const spaceToDrawX = (topLeftBoardX * 12 - 10) / this.width;
    const spaceToDrawY = (topLeftBoardY * 12 - 10) / this.length;
    for (let rowIndexChessBoard = 0; rowIndexChessBoard < this.length; rowIndexChessBoard++) {
      for (let colIndexChessBoard = 0; colIndexChessBoard < this.width; colIndexChessBoard++) {
        if ((rowIndexChessBoard + colIndexChessBoard) % 2 === 0) {
          ctx.fillStyle = WHITE;
        } else {
          ctx.fillStyle = BROWN;
        }
        ctx.fillRect(startRowIndex + spaceToDrawX * rowIndexChessBoard, startColIndex + spaceToDrawY * colIndexChessBoard, spaceToDrawX, spaceToDrawY);
      }
    }
  }

  /**
   * @deprecated Función que crea las distintas fichas que tiene un tablero de ajedrez
   * y las imprime por pantalla.
   */
  drawPieces() {
    const CANVAS = document.getElementById('chess-board');
    const PROPORTION_DIVISION = 16;
    const OFFSET_OF_START = 5;
    const DOUBLE = 2;
    const REMAINING_SQUARES = 12;
    const topLeftBoardX = CANVAS.width / PROPORTION_DIVISION;
    const topLeftBoardY = CANVAS.height / PROPORTION_DIVISION;
    const startRowIndex = topLeftBoardX * DOUBLE + OFFSET_OF_START;
    const startColIndex = topLeftBoardY * DOUBLE + OFFSET_OF_START;
    const spaceToDrawX = (topLeftBoardX * REMAINING_SQUARES - OFFSET_OF_START * DOUBLE) / this.width;
    const spaceToDrawY = (topLeftBoardY * REMAINING_SQUARES - OFFSET_OF_START * DOUBLE) / this.length;
    const pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    const colors = ['black', 'white'];
    for (let colIndexChessBoard = 0; colIndexChessBoard < this.width; colIndexChessBoard++) {
      const pieceName = pieces[colIndexChessBoard];
      const topSidePieceColor = colors[0];
      const bottomSidePieceColor = colors[1];
      const topSidePiece = new ChessPieceClass(pieceName, topSidePieceColor);
      topSidePiece.drawPiece(startRowIndex, startColIndex + spaceToDrawY * colIndexChessBoard, spaceToDrawX, spaceToDrawY);
      const bottomSidePiece = new ChessPieceClass(pieceName, bottomSidePieceColor);
      bottomSidePiece.drawPiece(startRowIndex + spaceToDrawX * this.length - spaceToDrawX, startColIndex + spaceToDrawY * colIndexChessBoard, spaceToDrawX, spaceToDrawY);
    }
    const pawnString = 'pawn';
    for (let colIndexChessBoard = 0; colIndexChessBoard < this.width; colIndexChessBoard++) {
      const topSidePieceColor = colors[0];
      const bottomSidePieceColor = colors[1];
      const topSidePiece = new ChessPieceClass(pawnString, topSidePieceColor);
      topSidePiece.drawPiece(startRowIndex + spaceToDrawX, startColIndex + spaceToDrawY * colIndexChessBoard, spaceToDrawX, spaceToDrawY);
      const bottomSidePiece = new ChessPieceClass(pawnString, bottomSidePieceColor);
      bottomSidePiece.drawPiece(startRowIndex + spaceToDrawX * this.length - spaceToDrawX * 2, startColIndex + spaceToDrawY * colIndexChessBoard, spaceToDrawX, spaceToDrawY);
    }
  }
}

if (typeof(window) === 'undefined') {
  module.exports = DrawableChessBoard;
}