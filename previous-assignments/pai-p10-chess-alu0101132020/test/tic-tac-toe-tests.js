/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 11 PAI - Ajedrez. Programación Gráfica y Orientada a Objetos en JS.
 *  @author: Manuel Andrés Carrera Galafate
 *  @since 06/05/2020
 *  @desc Tests de ejercicio de prácticas.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P11-Chess/blob/master/2019-2020_p10_Chess.md
 *              Descripción del camino aleatorio.
 *              https://es.wikipedia.org/wiki/Problema_de_las_ocho_reinas
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/pai-p10-chess-alu0101132020
 *
 *  @file Fichero que contiene los tests para probar el ejercicio de prácticas
 *
 *  @version  06/05/2020 - Creación (primera versión) del código.
 */

let TicTacToeBoardTest = null;

if (typeof(window) === 'undefined') {
  const chai = require('chai');
  expectTest = chai.expect;
  TicTacToeTest = require('../src/tic-tac-toe-board');
} else {
  expectTest = expect;
  TicTacToeBoardTest = TicTacToeBoard;
}

'use strict';

describe ('TicTacToeBoard', () => {
  describe('default chessBoard', () => {
  let board = new TicTacToeBoardTest;
    it ('should return 3 as board width', () => {
      expectTest(board.width).to.equal(3);
    });
    it ('should return 8 as board length', () => {
      expectTest(board.length).to.equal(3);
    });
    it ('should have 9 squares', () => {
      expectTest(board.squares.length * board.squares[0].length).to.equal(9);
    });
  });
  describe('TicTacToe with params', () => {
    let board = new TicTacToeBoardTest(4, 4);
      it ('should return 4 as board width', () => {
        expectTest(board.width).to.equal(4);
      });
      it ('should return 4 as board length', () => {
        expectTest(board.length).to.equal(4);
      });
      it ('should have 16 squares', () => {
        expectTest(board.squares.length * board.squares[0].length).to.equal(16);
      });
    });
  describe('addElement', () => {
    let board = new TicTacToeBoardTest;
    board.addElement('X', 2, 2);
    board.addElement('O', 1, 0);
      it ('should return have an X', () => {
        expectTest(board.squares[2][2]).to.equal('X');
      });
      it ('should return have an O', () => {
        expectTest(board.squares[1][0]).to.equal('O');
      });
      it ('should return false', () => {
        expectTest(board.squares[0][0]).to.equal(false);
      });
    });
  describe('posibleSolutions', () => {
    let board = new TicTacToeBoardTest;
    board.addElement('X', 2, 2);
    board.addElement('O', 1, 0);
      it ('should return as first point x 1', () => {
        expectTest(board.checkPosibleSolutions()[0].x).to.equal(1);
      });
    });
    describe('rowWinning', () => {
      let board = new TicTacToeBoardTest;
      board.addElement('X', 2, 2);
      board.addElement('O', 1, 0);
        it ('should return false', () => {
          expectTest(board.checkIfWinner()).to.equal(false);
        });

      it ('should return true', () => {
        board.addElement('X', 0, 2);
        board.addElement('X', 1, 2);
        expectTest(board.checkIfWinner()).to.equal(true);
      });
    });
    describe('colWinning', () => {
      let board = new TicTacToeBoardTest;
      board.addElement('X', 0, 2);
      it ('should return false', () => {
        expectTest(board.checkIfWinner()).to.equal(false);
      });
      it ('should return true', () => {
        board.addElement('X', 1, 2);
        board.addElement('X', 2, 2);
        expectTest(board.checkIfWinner()).to.equal(true);
      });
    });
    // describe('generatingNewSolutions', () => {
    //   let board = new TicTacToeBoardTest;
    //   board.addElement('X', 0, 2);
    //   const currentBoard = board.squares.slice();
    //   console.log(currentBoard)
    //   it ('should return that both boards are different', () => {
    //     board.generateNewPlay();
    //     board.generateNewPlay();
    //     const newBoard = board.squares;
    //     expectTest(newBoard !== currentBoard).to.equal(true);
    //   });
    // });
});