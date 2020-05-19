/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 11 PAI - Ajedrez. Programación Gráfica y Orientada a Objetos en JS.
 *  @author: Manuel Andrés Carrera Galafate
 *  @since 02/05/2020
 *  @desc Programa principal de ejercicio evaluación.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P11-Chess/blob/master/2019-2020_p10_Chess.md
 *              Descripción del camino aleatorio.
 *              https://es.wikipedia.org/wiki/Problema_de_las_ocho_reinas
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/pai-p10-chess-alu0101132020
 *
 *  @file Fichero del programa principal
 *
 *  @version  02/05/2020 - Creación (primera versión) del código.
 */

'use strict';

let TicTacToeClass = null;
let TicTacToeDrawableClass = null;

if (typeof(window) === 'undefined') {
  TicTacToeClass = require('../src/tic-tac-toe-boardticta');
  TicTacToeDrawableClass = require('../src/drawable-tic-tac-toe-board')
} else {
  TicTacToeClass = TicTacToeBoard;
  TicTacToeDrawableClass = DrawableTicTacToeBoard;
}

const createBoard = () => {
  board = new TicTacToeClass;
  showBoard();
}

const generateNewPlay = () => {
  board.generateNewPlay();
  console.log(board.squares);
  showBoard();
}

const showBoard = () => {
  const boardToDraw = new TicTacToeDrawableClass(board);
  boardToDraw.printBoard();
}

let board = null;

main();