/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 12. El juego de la vida. Programación Gráfica, Orientada a Objetos y dirigida por eventos en JS.
 *  @author: Manuel Andrés Carrera Galafate
 *  @since 09/05/2020
 *  @desc Clase juego de la vida.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P12-Life/blob/master/2019-2020_p12_Life.md
 *              Descripción del camino aleatorio.
 *              https://en.wikipedia.org/wiki/Conway's_Game_of_Life
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/pai-p12-life-alu0101132020
 *
 *  @file Fichero que contiene la implementación de la clase juego de la vida.
 *
 *  @version  09/05/2020 - Creación (primera versión) del código.
 */

'use strict';

let GridOfCellsClass = null;

if (typeof(window) === 'undefined') {
  GridOfCellsClass = require('../src/grid-of-cells');
} else {
  GridOfCellsClass = LifeGridOfCells;
}

const ALIVE_COLOR = 'white';
const DEAD_COLOR = 'black';
const DEAD = 0;
const ALIVE = 1;
const GRID_ONE = 0;
const GRID_TWO = 1;
const GRID_COLOR = 'grey';

/**
 * @description Clase juego de la vida. 
 * El juego de la vida contiene 2 cuadrículas del mismo tamaño que se van alternando
 * como cuadrícula principal de la partida y donde para definir el estado actual
 * de una se usa el estado actual de la que no se va a usar. También tiene un canvas
 * sobre el que se va a dibujar y dos variables para controlar la velocidad de
 * actualizado. Además, contiene métodos para generar un número aleatorio de 
 * células vivas, para definir qué células vidas habrá, un método para generar 
 * partidas aleatorias...
 */
class GameOfLife {
  /**
   * @description Constructor de una cuadrícula de células.
   * @param {int} columnsOfGrids número de columnas que componen nuestra cuadrícula
   * @param {int} rowsOfGrids número de filas qeu componen nuestra cuadrícula.
   * @param {string} colorAliveCells color para las células vivas de nuestra cuadrícula
   * @param {string} colorDeadCells color para las células muertas de nuestra cuadrícula.
   */
  constructor (columnsOfGrids = 0, rowsOfGrids = 0, colorAliveCells = ALIVE_COLOR, colorDeadCells = DEAD_COLOR, canvas) {
    this.gridOne = new GridOfCellsClass(columnsOfGrids, rowsOfGrids, colorAliveCells, colorDeadCells);
    this.gridTwo = new GridOfCellsClass(columnsOfGrids, rowsOfGrids, colorAliveCells, colorDeadCells);
    this.currentGridBool = GRID_ONE;
    this.currentGrid = this.gridOne;
    this.canvas = canvas;
    this.strokeMode = 1;
  }

  /* istanbul ignore next */
  /**
   * @description Función que se encarga de dibujar en el canvas el estado actual
   * de la cuadrícula que esté representando el estado de la partida.
   */
  drawState() {
    const spaceToDrawX = this.canvas.width / this.currentGrid.columns;
    const spaceToDrawY = this.canvas.height / this.currentGrid.rows ;
    let ctx = this.canvas.getContext('2d');
    for (let currentColumn = 0; currentColumn < this.currentGrid.columns; currentColumn++) {
      for (let currentRow = 0; currentRow < this.currentGrid.rows; currentRow++) {   
        ctx.fillStyle = this.currentGrid.cells[currentColumn][currentRow].color;
        ctx.fillRect(spaceToDrawX * currentColumn, spaceToDrawY * currentRow, spaceToDrawX, spaceToDrawY);
        if (this.strokeMode) {
          ctx.strokeStyle = GRID_COLOR;
          ctx.strokeRect(spaceToDrawX * currentColumn, spaceToDrawY * currentRow, spaceToDrawX, spaceToDrawY)
        }
      }
    }
  }

  /**
   * @description Función que se encarga de generar el siguiente estado. Para
   * ello actualiza a cuadrícula actual aquella que no se estaba usando y usa
   * la que sí lo estaba haciendo como cuadrícula base para generar el nuevo estado.
   */
  generateNextState() {
    this.currentGrid = this.currentGridBool === GRID_ONE ? this.gridTwo : this.gridOne;
    const baseGrid = this.currentGridBool === GRID_ONE ? this.gridOne : this.gridTwo;
    this.nextGenerationFromAGrid(baseGrid);
    this.currentGridBool = this.currentGridBool === GRID_ONE ? GRID_TWO : GRID_ONE;
  }

  /**
   * @description función que calcula la siguiente generación del sistema a partir
   * de una cuadrícula que se usará como estado previo. Para cada célula de la
   * nueva generación se calcula sus vecinos, y en base al estado que tenía previamente
   * y el número de estados se decide su vitalidad.
   * @param {grid} baseGrid cuadrícula que se usa de referencia para formar el
   * siguiente estado.
   */
  nextGenerationFromAGrid(baseGrid) {
    for (let currentColumn = 0; currentColumn < this.currentGrid.columns; currentColumn++) {
      for (let currentRow = 0; currentRow < this.currentGrid.rows; currentRow++) {
        const neighbors =  this.countNeighbors(currentColumn, currentRow, baseGrid);
        this.updateCell(currentColumn, currentRow, neighbors, baseGrid);
      }
    }
  }

  /**
   * @description Función que para cada célula cuenta el número de células vivas
   * que tiene como vecinas. Para ello se observa como vecindad todo el entorno
   * de una célula dada su columna y fila a una distancia de 1 en cualquiera
   * de estas dos componentes o ambas simultáneamente.
   * @param {int} rowOfCell fila de la célula a comprobar.
   * @param {int} columnOfCell columna de la célula a comprobar.
   * @param {grid} baseGrid cuadrícula que se usa de referencia para formar el
   * siguiente estado. 
   * @return {int} Suma de todos los vecinos que son células vivas
   */
  countNeighbors(columnOfCell, rowOfCell, baseGrid) {
    let countNeighbors = 0;
    for (let offSetFromRow = -1; offSetFromRow < 2; offSetFromRow++) {
      for (let offSetFromColumn = -1; offSetFromColumn < 2; offSetFromColumn++) {
        if (!(offSetFromColumn == 0 && offSetFromRow == 0)) {
          const x = (offSetFromColumn + columnOfCell + baseGrid.columns) % baseGrid.columns;
          const y = (offSetFromRow + rowOfCell + baseGrid.rows) % baseGrid.rows;
          countNeighbors += baseGrid.cells[x][y].state;
        }
      }
    }
    return countNeighbors;
  }

  /**
   * @description Función que actualiza una celda en base el estado de esta en
   * la cuadrícula de base y el número de vecinos de esta.
   * @param {int} rowOfCell coordenada y de la célula que estamos comprobando.
   * @param {int} columnOfCell coordenada x de la célula que estamos comprobando.
   * @param {int} neighbors número de vecinos que tiene una célula dada
   * @param {grid} baseGrid cuadrícula que se usa de referencia para formar el
   * siguiente estado.
   */
  updateCell(columnOfCell, rowOfCell, neighbors, baseGrid) {
    if (baseGrid.cells[columnOfCell][rowOfCell].state === DEAD && neighbors === 3) {
      this.currentGrid.makeAliveCell(columnOfCell, rowOfCell);
    } else if (baseGrid.cells[columnOfCell][rowOfCell].state === ALIVE && (neighbors < 2 || neighbors > 3)) {
      this.currentGrid.killCell(columnOfCell, rowOfCell);
    } else {
      if (baseGrid.cells[columnOfCell][rowOfCell].state === ALIVE) {
        this.currentGrid.makeAliveCell(columnOfCell, rowOfCell);
      } else {
        this.currentGrid.killCell(columnOfCell, rowOfCell);
      }
    }
  }

  /**
  * @description Función que para cada célula de la cuadrícula le da un estado
  * aleatorio, ya sea vivo o muerto y ajusta el color de la célula en base a esto.
  */
  generateRandomCellStates() {
    for (let currentColumn = 0; currentColumn < this.currentGrid.columns - 1; currentColumn++) {
      for (let currentRow = 0; currentRow < this.currentGrid.rows - 1; currentRow++) {
        let state = Math.floor(Math.random() * 2);
        if (state === ALIVE) {
          this.currentGrid.makeAliveCell(currentColumn, currentRow);
        } else {
          this.currentGrid.killCell(currentColumn, currentRow);
        }
      }
    }
  }

  /**
  * @description Función que da vida a un número determinado de células del tablero.
  * @param {int} numberOfCells Número de células a hacer vivir.
  */
  generateNCellsAlive(numberOfCells) {
    let deadCells = this.getDeadCells();
    while (numberOfCells > 0 && deadCells.length > 0) {
      const randIndex = Math.floor(Math.random() * deadCells.length);
      const cell = deadCells[randIndex];
      this.currentGrid.makeAliveCell(cell.numberOfColums, cell.numberOfRows);
      deadCells.splice(randIndex, 1);
      numberOfCells--;
    }
  }

  /**
   * @description Función que retorna todas las células de la partida que están
   * muertas.
   */
  getDeadCells() {
    let deadCells = [];
    for (let numberOfColums = 0; numberOfColums < this.currentGrid.columns; numberOfColums++) {
      for (let numberOfRows = 0; numberOfRows < this.currentGrid.rows; numberOfRows++) {
      if (this.currentGrid.cells[numberOfColums][numberOfRows].state === DEAD) {
        deadCells.push({numberOfColums, numberOfRows});
        }
      }
    }
    return deadCells;
  }
}

if (typeof(window) === 'undefined') {
  module.exports = GameOfLife;
}