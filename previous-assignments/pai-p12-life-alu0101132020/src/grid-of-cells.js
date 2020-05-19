/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 12. El juego de la vida. Programación Gráfica, Orientada a Objetos y dirigida por eventos en JS.
 *  @author: Manuel Andrés Carrera Galafate
 *  @since 09/05/2020
 *  @desc Clase célula del juego de la vida.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P12-Life/blob/master/2019-2020_p12_Life.md
 *              Descripción del camino aleatorio.
 *              https://en.wikipedia.org/wiki/Conway's_Game_of_Life
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/pai-p12-life-alu0101132020
 *
 *  @file Fichero que contiene la implementación de la clase célula del juego de la vida.
 *
 *  @version  09/05/2020 - Creación (primera versión) del código.
 */

'use strict';

let LifeCellClass = null;

if (typeof(window) === 'undefined') {
  LifeCellClass = require('../src/cell');
} else {
  LifeCellClass = LifeCell;
}

const ALIVE_COLOR_GRID = 'white';
const DEAD_COLOR_GRID = 'black';
const DEAD_GRID = 0;
const ALIVE_GRID = 1;

/**
 * @description Clase cuadrícula de células del juego de la vida. 
 * Una cuadrícula del juego de la vida vendrá definida por unas columnas, unas
 * filas, una matriz (array de array) células y unos colores para los distintos
 * tipos de células. Además de contener todas las células de una instancia del
 * juego de la vida, tendrá un método para autorellenarse con un conjunto aleatorio
 * (en cuanto a su vitalidad) de células.
 */
class LifeGridOfCells {
  /**
   * @description Constructor de una cuadrícula de células.
   * @param {int} columns número de columnas que componen nuestra cuadrícula
   * @param {int} rows número de filas qeu componen nuestra cuadrícula.
   * @param {string} colorAliveCells color para las células vivas de nuestra cuadrícula
   * @param {string} colorDeadCells color para las células muertas de nuestra cuadrícula.
   */
  constructor (columns = 0, rows = 0, colorAliveCells = ALIVE_COLOR_GRID, colorDeadCells = DEAD_COLOR_GRID) {
    this.columns = columns;
    this.rows = rows;
    this.colorAliveCells = colorAliveCells;
    this.colorDeadCells = colorDeadCells;
    this.cells = [];
    for (let currentColumn = 0; currentColumn < this.columns; currentColumn++) {
      this.cells[currentColumn] = [];
      for (let currentRow = 0; currentRow < this.rows; currentRow++) {
        this.cells[currentColumn][currentRow] = new LifeCellClass(DEAD_GRID, 
          currentColumn, currentRow, DEAD_COLOR_GRID);
      }
    }
    this.aliveCells = 0;
    this.deadCells = columns * rows;
  }

  /**
   * @description Función que comprueba si una célula en una posición dada
   * está viva, y de no ser así, se la hace cambiar su estado a este y se
   * actualiza el número de células vivas y muertas.
   * @param {int} column columna de la célula que se va crear 
   * @param {int} row fila de la célula que se va a crear
   */
  makeAliveCell(column, row) {
    if (this.cells[column][row].state !== ALIVE_GRID) {
      this.cells[column][row].changeState(ALIVE_GRID);
      this.aliveCells++;
      this.deadCells--;
    }
  }

  /**
   * @description Función que comprueba si una célula en una posición dada
   * está muerta, y de no ser así, se la hace cambiar su estado a este y se
   * actualiza el número de células vivas y muertas.
   * @param {int} column columna de la célula que se va crear 
   * @param {int} row fila de la célula que se va a crear
   */
  killCell(column, row) {
    if (this.cells[column][row].state !== DEAD_GRID) {
      this.cells[column][row].changeState(DEAD_GRID);
      this.aliveCells--;
      this.deadCells++;
    }
  }
}

if (typeof(window) === 'undefined') {
  module.exports = LifeGridOfCells;
}