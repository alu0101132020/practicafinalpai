/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 11 PAI - Ajedrez. Programación Gráfica y Orientada a Objetos en JS.
 *  @author: Manuel Andrés Carrera Galafate
 *  @since 06/05/2020
 *  @desc Clase tablero de 3 en raya que se puede dibujar.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P11-Chess/blob/master/2019-2020_p10_Chess.md
 *              Descripción del camino aleatorio.
 *              https://es.wikipedia.org/wiki/Problema_de_las_ocho_reinas
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/pai-p10-chess-alu0101132020
 *
 *  @file Fichero que contiene la implementación de la clase tablero de 3 en raya
 *  con función de dibujado.
 *
 *  @version  06/05/2020 - Creación (primera versión) del código.
 */

'use strict';

const BLACK = 'black';
const BROWN = '#946f51';
const WHITE = '#F0D9B5';

let TicTacToeBoardClass = null;

if (typeof(window) === 'undefined') {
  TicTacToeBoardClass = require('../src/tic-tac-toe-board');
} else {
  TicTacToeBoardClass = TicTacToeBoard
}

/**
 * @description Clase tablero de 3 en rayas. Añade un método para dibujar el tablero.
 */
class DrawableTicTacToeBoard extends TicTacToeBoardClass {
  /**
   * @description Constructor de un tablero de 3 en raya. Recibe
   * como parámetros el número de filas y de columnas del tablero con el fin
   * de intentar parametrizar el tablero y poder hacer un n en raya.
   * @param {int} boardWidth Anchura del tablero
   * @param {int} boardLength Altura del tablero
   */
  constructor (board) {
    super(board.width, board.length);
    this.board = board
  }

  /**
  * @desc Imprime el tablero.
  */
  printBoard () {
    this.drawEmptyBoard();
    this.drawPieces();
  };

  /**
   * @description Función que dibuja un tablero vacío.
   */
  drawEmptyBoard () {
    const CANVAS = document.getElementById('Tic-Tac-Toe');
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
    const spaceToDrawX = (topLeftBoardX * 12 - 10) / this.board.width;
    const spaceToDrawY = (topLeftBoardY * 12 - 10) / this.board.length;
    for (let rowIndexChessBoard = 0; rowIndexChessBoard < this.board.length; rowIndexChessBoard++) {
      for (let colIndexChessBoard = 0; colIndexChessBoard < this.board.width; colIndexChessBoard++) {
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
    const CANVAS = document.getElementById('Tic-Tac-Toe');
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
    for (let rowIndex = 0; rowIndex < this.board.width; rowIndex++) {
      for (let colIndex = 0; colIndex < this.board.width; colIndex++) {
        if (this.board.squares[rowIndex][colIndex] === 'O') {
          topSidePiece.drawPiece(startRowIndex + spaceToDrawX * rowIndex, startColIndex + spaceToDrawY * colIndex, spaceToDrawX, spaceToDrawY);
        } else if (this.board.squares[rowIndex][colIndex] === 'X') {

        }
        }
    }
  }
}

if (typeof(window) === 'undefined') {
  module.exports = DrawableTicTacToeBoard;
}