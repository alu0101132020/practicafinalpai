/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 11 PAI - Ajedrez. Programación Gráfica y Orientada a Objetos en JS.
 *  @author: Manuel Andrés Carrera Galafate
 *  @since 06/05/2020
 *  @desc Clase tablero de 3 en raya.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P11-Chess/blob/master/2019-2020_p10_Chess.md
 *              Descripción del camino aleatorio.
 *              https://es.wikipedia.org/wiki/Problema_de_las_ocho_reinas
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/pai-p10-chess-alu0101132020
 *
 *  @file Fichero que contiene la implementación de la clase tablero de 3 en raya.
 *
 *  @version  06/05/2020 - Creación (primera versión) del código.
 */

'use strict';

let PointClass = null;

if (typeof(window) === 'undefined') {
  PointClass = require('../src/point');
} else {
  PointClass = Point
}

/**
 * @description Clase tablero de 3 en raya.
 */
class TicTacToeBoard {
  /**
   * @description Constructor de un tablero de 3 en raya. Recibe
   * como parámetros el número de filas y de columnas del tablero con el fin
   * de intentar parametrizar el tablero y poder hacer un n en raya.
   * @param {int} boardWidth Anchura del tablero
   * @param {int} boardLength Altura del tablero
   */
  constructor (boardWidth = 3, boardLength = 3) {
    this.currentPlayer = 'O';
    this.width = boardWidth;
    this.length = boardLength;
    this.winner = null;
    this.squares = [];
    for (let numberOfRows = 0; numberOfRows < this.length; numberOfRows++) {
      this.squares[numberOfRows] = [];
      for (let numberOfColums = 0; numberOfColums < this.width; numberOfColums++) {
        this.squares[numberOfRows][numberOfColums] = false;
      }
    }
  }

  /**
   * @description Función que añade un elemento a escribir en la posición
   * (X, Y) del tablero.
   * @param {string} elementToAdd Elemento que se escribirá
   * @param {int} positionX Coordenada X del tablero donde se escribirá
   * @param {int} positionY Coordenada Y del tablero donde se escribirá
   */
  addElement(elementToAdd, positionX, positionY) {
    this.squares[positionX][positionY] = elementToAdd;
  }

  checkIfWinner() {
    let posibleSolutions = this.checkPosibleSolutions();
    for (const solution of posibleSolutions) {
      if (this.rowWinning(solution) || this.colWinning(solution) ||
        this.diagonalWinning(solution)) {
          this.setWinner(solution);
          return true;
      }
    }
    return false;
  }

  rowWinning(posibleSolution) {
    const xStart = posibleSolution.x;
    const yStart = posibleSolution.y;
    const elementsToFind = this.width;
    const stringToFind = this.squares[xStart][yStart];
    let elementsFound = 1;
    for (let currentIteration = 0; currentIteration < elementsToFind; currentIteration++) {
      if (this.squares[xStart][yStart + currentIteration] === stringToFind) {
        elementsFound++
      } else {
        break;
      }
    }
    if (elementsFound === elementsToFind) {
      return true;
    }
    return false;
  }

  colWinning(posibleSolution) {
    const xStart = posibleSolution.x;
    const yStart = posibleSolution.y;
    const elementsToFind = this.width;
    const stringToFind = this.squares[xStart][yStart];
    let elementsFound = 1;
    for (let currentIteration = 0; currentIteration < elementsToFind; currentIteration++) {
      if ((xStart + currentIteration) < elementsToFind && (yStart + currentIteration) < elementsToFind) {
      if (this.squares[xStart + currentIteration][yStart] === stringToFind) {
        elementsFound++
      } else {
        break;
      }
    }
    if (elementsFound === elementsToFind) {
      return true;
    }
    return false;
  }
}

  diagonalWinning(posibleSolution) {
    const xStart = posibleSolution.x;
    const yStart = posibleSolution.y;
    const elementsToFind = this.width;
    const stringToFind = this.squares[xStart][yStart];
    let elementsFound = 1;
    for (let currentIteration = 0; currentIteration < elementsToFind; currentIteration++) {
      if ((xStart + currentIteration) < elementsToFind && (yStart + currentIteration) < elementsToFind) {
        if (this.squares[xStart + currentIteration][yStart + currentIteration] === stringToFind) {
          elementsFound++
        } else {
          break;
        }
      }
    }
    if (elementsFound === elementsToFind) {
      return true;
    }
    return false;
  }

  setWinner(solution) {
    this.winner = this.squares[solution.x][solution.y];
  }

  /**
   * @description Función que encuentra todas las casillas donde hay algún elemento
   * no vacío.
   * @return {array} Puntos no vacíos.
   */
  checkPosibleSolutions() {
    let posibleSolutions = [];
    for (let numberOfRows = 0; numberOfRows < this.length; numberOfRows++) {
      if (this.squares[numberOfRows][0] !== false) {
        posibleSolutions.push(new PointClass(numberOfRows, 0));
      }
    }
    for (let numberOfColums = 0; numberOfColums < this.width; numberOfColums++) {
      if (this.squares[0][numberOfColums] !== false) {
        posibleSolutions.push(new PointClass(numberOfColums, 0));
      }
    }
    return posibleSolutions;
  }

  swapPlayer() {
    if (this.currentPlayer === 'O') {
      this.currentPlayer = 'X';
    } else {
      this.currentPlayer = 'O';
    }
  }

  checkFreeSquares() {
    let freeSquares = [];
    for (let numberOfRows = 0; numberOfRows < this.length; numberOfRows++) {
      for (let numberOfColums = 0; numberOfColums < this.width; numberOfColums++) {
      if (this.squares[numberOfRows][numberOfColums] === false) {
        freeSquares.push(new PointClass(numberOfRows, numberOfColums));
        }
      }
    }
    return freeSquares;
  }

  generateNewPlay() {
    let length = 9;
    const freeSquares = this.checkFreeSquares();
    const newPlay = Math.floor(Math.random() * freeSquares.length);
    const newPlayPoint = freeSquares[newPlay];
    this.squares[newPlayPoint.x][newPlayPoint.y] = this.currentPlayer;
    this.checkIfWinner();
    this.swapPlayer();
    length = freeSquares.length
  }
}


if (typeof(window) === 'undefined') {
  module.exports = TicTacToeBoard;
}