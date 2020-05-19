/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 11 PAI - Ajedrez. Programación Gráfica y Orientada a Objetos en JS.
 *  @author: Manuel Andrés Carrera Galafate
 *  @since 02/05/2020
 *  @desc Tests
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P11-Chess/blob/master/2019-2020_p10_Chess.md
 *              Descripción del camino aleatorio.
 *              https://es.wikipedia.org/wiki/Problema_de_las_ocho_reinas
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/pai-p10-chess-alu0101132020
 *
 *  @file Fichero que contiene los tests para probar las distintas clases.
 *
 *  @version  02/05/2020 - Creación (primera versión) del código.
 */

let chessBoardTest = null;
let queenChessBoardTest = null;
let pointTest = null;
let expectTest = null;
let pieceTest = null;

if (typeof(window) === 'undefined') {
  chessBoardTest = require('../src/chess-board');
  pointTest = require('../src/point');
  const chai = require('chai');
  expectTest = chai.expect;
  queenChessBoardTest = require('../src/queens-chess-board');
  pieceTest = require('../src/chess-piece');
} else {
  chessBoardTest = ChessBoard;
  expectTest = expect;
  pointTest = Point;
  queenChessBoardTest = ChessBoardQueens;
  pieceTest = ChessPiece;
}

'use strict';

describe ('ChessBoard', () => {
  describe('default chessBoard', () => {
  let board = new chessBoardTest;
    it ('should return 8 as board width', () => {
      expectTest(board.width).to.equal(8);
    });
    it ('should return 8 as board length', () => {
      expectTest(board.length).to.equal(8);
    });
    it ('should have 64 squares', () => {
      expectTest(board.squares.length * board.squares[0].length).to.equal(64);
    });
  });
  describe('chessBoard with params', () => {
    let board = new chessBoardTest(8, 8);
      it ('should return 8 as board width', () => {
        expectTest(board.width).to.equal(8);
      });
      it ('should return 8 as board length', () => {
        expectTest(board.length).to.equal(8);
      });
      it ('should have 64 squares', () => {
        expectTest(board.squares.length * board.squares[0].length).to.equal(64);
      });
    });
});

describe ('Point', () => {
  describe('getters', () => {
  let testPoint = new pointTest(3, 4);
    it ('should return 3 as x component of our point', () => {
      expectTest(testPoint.x).to.equal(3);
    });
    it ('should return 4 as y component of our point', () => {
      expectTest(testPoint.y).to.equal(4);
    });
  });
  describe('setters', () => {
    let testPoint = new pointTest(3, 4);
    testPoint.x = 5;
    testPoint.y = 3;
    it ('should return 5 as x component of our point after setting it', () => {
      expectTest(testPoint.x).to.equal(5);
    });
    it ('should return 3 as y component of our point after setting it', () => {
      expectTest(testPoint.y).to.equal(3);
    });
  });
});

describe ('ChessPiece', () => {
  describe('default getters', () => {
    let whitePawn = new pieceTest;
    it ('should return pawn as piece name', () => {
      expectTest(whitePawn.name).to.equal('pawn');
    });
    it ('should return white as piece color', () => {
      expectTest(whitePawn.color).to.equal('white');
    });
  });
  describe('getters', () => {
    let blackHorse = new pieceTest('horse', 'black');
    it ('should return horse as piece name', () => {
      expectTest(blackHorse.name).to.equal('horse');
    });
    it ('should return white as piece color', () => {
      expectTest(blackHorse.color).to.equal('black');
    });
  });
});

describe ('QueensChessBoard', () => {
  describe('getters', () => {
    let board = new queenChessBoardTest;
    it ('should return 0 as current solutions', () => {
      expectTest(board.currentSolutions).to.equal(0);
    });
    it ('should return empty array as solutions', () => {
      expectTest(board.solutions.length).to.equal([].length);
    });
  });
  describe('check if solution', () => {
    let board = new queenChessBoardTest;
    it ('should return false', () => {
      expectTest(board.checkIfSolution(6, 8)).to.equal(false);
    });
    it ('should return true', () => {
      expectTest(board.checkIfSolution(7, 8)).to.equal(true);
    });
  });
  describe('check if free row', () => {
    let board = new queenChessBoardTest;
    board.squares = [[false, true, false], [false, false, false], [false, false, false]];
    it ('should return true', () => {
      expectTest(board.checkFreeRow(2)).to.equal(true);
    });
    it ('should return false', () => {
      expectTest(board.checkFreeRow(0)).to.equal(false);
    });
  });
  describe('check if free diagonal', () => {
    let board = new queenChessBoardTest;
    board.squares = [[true, false, false], [false, false, false], [false, false, false]];
    board.generalized = false;
    it ('should return false', () => {
      expectTest(board.checkFreeDiag(1, 1)).to.equal(false);
    });
    it ('should return true', () => {
      expectTest(board.checkFreeRow(1, 0)).to.equal(true);
    });
  });
});

