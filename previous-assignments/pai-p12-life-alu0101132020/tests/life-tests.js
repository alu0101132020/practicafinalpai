/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 12. El juego de la vida. Programación Gráfica, Orientada a Objetos y dirigida por eventos en JS.
 *  @author: Manuel Andrés Carrera Galafate
 *  @since 09/05/2020
 *  @desc Fichero de tests para desarrollo TDD.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P12-Life/blob/master/2019-2020_p12_Life.md
 *              Descripción del camino aleatorio.
 *              https://en.wikipedia.org/wiki/Conway's_Game_of_Life
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/pai-p12-life-alu0101132020
 *
 *  @file Fichero que contiene los distintos tests necesarios para la implementación
 *  del juego de la vida.
 *
 *  @version  09/05/2020 - Creación (primera versión) del código.
 */

'use strict';

let expectTest = null;
let LifeCellTest = null;
let LifeGridCellsTest = null;
let LifeTest = null;

const ALIVE_COLOR_TEST = 'white';
const DEAD_COLOR_TEST = 'black';
const DEAD_TEST = 0;
const ALIVE_TEST = 1;

if (typeof(window) === 'undefined') {
  const chai = require('chai');
  expectTest = chai.expect;
  LifeCellTest = require('../src/cell');
  LifeGridCellsTest = require('../src/grid-of-cells');
  LifeTest = require('../src/life');
} else {
  expectTest = expect;
  LifeCellTest = LifeCell;
  LifeGridCellsTest = LifeGridOfCells;
  LifeTest = GameOfLife;
}

describe ('LifeCell', () => {
  describe('default LifeCell', () => {
  let cell = new LifeCellTest;
    it ('should return 0 as cell state', () => {
      expectTest(cell.state).to.equal(0);
    });
    it ('should return 0 as cell x component', () => {
      expectTest(cell.x).to.equal(0);
    });
    it ('should return 0 as cell y component', () => {
      expectTest(cell.y).to.equal(0);
    });
    it ('should return black as cell color', () => {
      expectTest(cell.color).to.equal('black');
    });
  });
  describe('LifeCell with params', () => {
    let cell = new LifeCellTest(ALIVE_TEST, 3, 4, ALIVE_COLOR_TEST);
    it ('should return 1 as cell state', () => {
      expectTest(cell.state).to.equal(1);
    });
    it ('should return 3 as cell x component', () => {
      expectTest(cell.x).to.equal(3);
    });
    it ('should return 4 as cell y component', () => {
      expectTest(cell.y).to.equal(4);
    });
    it ('should return white as cell color', () => {
      expectTest(cell.color).to.equal('white');
    });
  });
  describe('LifeCell changing State', () => {
    let cell = new LifeCellTest(ALIVE_TEST, 3, 4, ALIVE_COLOR_TEST);
    let revivedCell = new LifeCellTest(DEAD_TEST, 3, 4, DEAD_COLOR_TEST);
    cell.changeState(DEAD_TEST);
    it ('should return 0 as cell state', () => {
      expectTest(cell.state).to.equal(0);
    });
    revivedCell.changeState(ALIVE_TEST);
    it ('should return 1 as cell state', () => {
      expectTest(revivedCell.state).to.equal(1);
    });
  });
});

describe ('LifeGridOfCells', () => {
  describe('default Grid', () => {
  let gridOfCells = new LifeGridCellsTest;
    it ('should return 0 as rows of the grid', () => {
      expectTest(gridOfCells.rows).to.equal(0);
    });
    it ('should return 0 as columns of the grid', () => {
      expectTest(gridOfCells.columns).to.equal(0);
    });
    it ('should return white as color for alive cells', () => {
      expectTest(gridOfCells.colorAliveCells).to.equal('white');
    });
    it ('should return white as color for dead cells', () => {
      expectTest(gridOfCells.colorDeadCells).to.equal('black');
    });
  });
  describe('Grid with params', () => {
    let gridOfCells = new LifeGridCellsTest(4, 7, 'red', 'yellow');
    it ('should return 7 as rows of the grid', () => {
      expectTest(gridOfCells.rows).to.equal(7);
    });
    it ('should return 4 as columns of the grid', () => {
      expectTest(gridOfCells.columns).to.equal(4);
    });
    it ('should return red as color for alive cells', () => {
      expectTest(gridOfCells.colorAliveCells).to.equal('red');
    });
    it ('should return yellow as color for dead cells', () => {
      expectTest(gridOfCells.colorDeadCells).to.equal('yellow');
    });
    it ('should have 28 cells', () => {
      expectTest(gridOfCells.cells.length * gridOfCells.cells[0].length).to.equal(28);
    });
  });
  describe('LifeCell changing State', () => {
    let gridOfCells = new LifeGridCellsTest(10, 10);
    gridOfCells.killCell(3, 3);
    gridOfCells.makeAliveCell(3, 3);
    it ('cell 3, 3 should be alive', () => {
      expectTest(gridOfCells.cells[3][3].state).to.equal(ALIVE_TEST);
    });
    gridOfCells.makeAliveCell(4, 4);
    gridOfCells.killCell(4, 4);
    it ('after making 4,4 alive and killing it, should be dead.', () => {
      expectTest(gridOfCells.cells[4][4].state).to.equal(DEAD_TEST);
    });
  });
});

describe ('GameOfLife', () => {
  let life = new LifeTest(10, 10, ALIVE_COLOR_TEST, DEAD_COLOR_TEST);
  it ('should return 5 as number of aliveCells', () => {
    life.generateNCellsAlive(5);
    expectTest(life.currentGrid.aliveCells).to.equal(5);
  });
  let clearLife = new LifeTest(10, 10, ALIVE_COLOR_TEST, DEAD_COLOR_TEST);
  it ('should return 4 as number of neighbors', () => {
    clearLife.currentGrid.makeAliveCell(4, 4);
    clearLife.currentGrid.makeAliveCell(4, 5);
    clearLife.currentGrid.makeAliveCell(3, 4);
    clearLife.currentGrid.makeAliveCell(4, 3);
    clearLife.currentGrid.makeAliveCell(5, 4);
    expectTest(clearLife.countNeighbors(4, 4, clearLife.currentGrid)).to.equal(4);
  });
  it ('point 4, 4 should be dead on next generation', () => {
    clearLife.nextGenerationFromAGrid(clearLife.currentGrid);
    expectTest(clearLife.currentGrid.cells[4][4].state).to.equal(DEAD_TEST);
  });
  it ('After next state, grid should be secondgrid.', () => {
    clearLife.generateNextState();
    expectTest(clearLife.currentGrid).to.equal(clearLife.gridTwo)
  });
});