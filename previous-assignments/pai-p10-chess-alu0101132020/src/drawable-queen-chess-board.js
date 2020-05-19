/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 11 PAI - Ajedrez. Programación Gráfica y Orientada a Objetos en JS.
 *  @author: Manuel Andrés Carrera Galafate
 *  @since 02/05/2020
 *  @desc Clase tablero de ajedrez de reinas que se puede dibujar.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P11-Chess/blob/master/2019-2020_p10_Chess.md
 *              Descripción del camino aleatorio.
 *              https://es.wikipedia.org/wiki/Problema_de_las_ocho_reinas
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/pai-p10-chess-alu0101132020
 *
 *  @file Fichero que contiene la implementación de la clase tablero de ajedrez
 *  para el problema de las 8 reinas con una función de dibujado.
 *
 *  @version  02/05/2020 - Creación (primera versión) del código.
 */

'use strict';

let ChessBoardQueensClass = null;

if (typeof(window) === 'undefined') {
  ChessBoardQueensClass = require('../src/queens-chess-board');
} else {
  ChessBoardQueensClass = ChessBoardQueens;
}

/**
 * @description Clase tablero de ajedrez de reinas. Básicamente modifica el método
 * printBoard para trabajar en un canvas.
 */
class DrawableChessBoardQueens extends ChessBoardQueensClass {
  /**
   * @description Constructor de un tablero que recibe 3 parámetros que lo
   * definirán, siendo la altura, la anchura del mismo y la definición de si el problema
   * es el general o el clásico.. El tablero contendrá
   * como atributos una altura, una anchura, un conjunto de casillas, un contador
   * de soluciones, un conjunto de soluciones y un booleano que define el tipo de
   * problema. En el tablero de reinas en cada casilla habrá un booleano
   * que nos indicará si hay una reina (true) o si no la hay (false).
   * Esta versión tiene la particularidad de que está hecha para dibujar en web.
   * @param {int} chessBoardWidth Anchura del tablero
   * @param {int} chessBoardLength Altura del tablero
   * @param {bool} generalized Define si el problema se va a resolver de manera
   * clásica (false) o generalizada (true).
   */
  constructor (chessBoardWidth = 8, chessBoardLength = 8, generalized) {
    super(chessBoardWidth, chessBoardLength, generalized);
  }

  /**
  * @desc Imprime el tablero con las reinas en pantalla a partir de una solución.
  * Para ello primero pinta un tablero y luego a partir de la fila y columna actual,
  * si en ella hay una reina esta se dibuja.
  * @param {array} solution - Tablero a escribir.
  */
  printBoard (solution) {
    this.drawBoard();
    for (let currentRow = 0; currentRow < solution.length; currentRow++) {
      for (let currentCol = 0; currentCol < solution[currentRow].length;
        currentCol++) {
        if (solution[currentRow][currentCol] === true) {
          this.drawQueen(currentRow, currentCol);
        }
      }
    }
  };

  /**
  * @desc Imprime el tablero en notación algebraica dentro del HTML usando el DOM
  * a partir de una solución dada. La notación algebraica del ajedrez define un
  * eje de coordenadas en el tablero, donde el eje X se nombra alfabeticamente
  * de izquierda a derecha (La primera columna izq del tablero es la A) y donde el eje
  * Y se nombra numéricamente (La primera fila superior es la 1). Así por ejemplo
  * la casilla de la esquina superior izquierda sería A1, a su derecha estaría
  * B1, etc...
  * @param {array} solution - Tablero a escribir algebraicamente
  */
  printAlgebraicConfiguration (solution) {
    let indexString = '';
    const chessColsIndex = [];
    let chessAlgebraicIndex = '';
    for (let index = 0; index < solution.length; index++) {
      indexString += (index + 1);
    }
    for (let index = 0; index < solution[0].length; index++) {
      chessColsIndex.push(index + 97);
      chessAlgebraicIndex += String.fromCharCode(chessColsIndex[index]);
    }
    for (let currentRow = 0; currentRow < solution.length; currentRow++) {
      for (let currentCol = 0; currentCol < solution[currentRow].length;
        currentCol++) {
        // Si se encuentra reina se escribe dentro del HTML la notación algebraica.
        if (solution[currentRow][currentCol] === true) {
          document.getElementById('caja-derecha').children[currentRow].innerHTML = `Reina ${currentRow + 1}: ${chessAlgebraicIndex[currentRow]}${indexString[currentCol]}`;
        }
      }
    }
  };

  /**
   * @description Función que dibuja el tablero sobre el que irán las reinas.
   */
  drawBoard () {
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
   * @description Función que dibuja una reina en el talero dibujado en base
   * a la columna y fila actual
   * @param {int} rowOfQueen Fila del tablero.
   * @param {int} columnOfQueen Columna del tablero.
   */
  drawQueen(rowOfQueen, columnOfQueen) {
    const CANVAS = document.getElementById('chess-board');
    const ctx = CANVAS.getContext('2d');
    const topLeftBoardX = CANVAS.width / 16;
    const topLeftBoardY = CANVAS.height / 16;
    const startRowIndex = topLeftBoardX * 2 + 5;
    const startColIndex = topLeftBoardY * 2 + 5;
    const spaceToDrawX = (topLeftBoardX * 12 - 10) / this.width;
    const spaceToDrawY = (topLeftBoardY * 12 - 10) / this.length;
    let image = new Image();
    image.src = '../img/black-queen.png';
    image.onload = () => {
      ctx.drawImage(image, startRowIndex + spaceToDrawX * rowOfQueen, startColIndex + spaceToDrawY * columnOfQueen, spaceToDrawX, spaceToDrawY);
   }
  }
}

if (typeof(window) === 'undefined') {
  module.exports = DrawableChessBoardQueens;
}