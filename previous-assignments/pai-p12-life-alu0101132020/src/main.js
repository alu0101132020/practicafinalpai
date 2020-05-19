/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 12. El juego de la vida. Programación Gráfica, Orientada a Objetos y dirigida por eventos en JS.
 *  @author: Manuel Andrés Carrera Galafate
 *  @since 09/05/2020
 *  @desc Programa principal.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P12-Life/blob/master/2019-2020_p12_Life.md
 *              Descripción del camino aleatorio.
 *              https://en.wikipedia.org/wiki/Conway's_Game_of_Life
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/pai-p12-life-alu0101132020
 *
 *  @file Fichero que contiene el código del programa principal.
 *
 *  @version  10/05/2020 - Creación (primera versión) del código.
 */

'use strict';


let GameOfLifeClass = null;

if (typeof(window) === 'undefined') {
  GameOfLifeClass = require('../src/life');
} else {
  GameOfLifeClass = GameOfLife;
}

/**
 * @description Función que instancia nuestra partida y tablero y la dibuja
 * en pantalla.
 */
const startGame = () => {
  const NUMBER_OF_COLUMNS = 50;
  const NUMBER_OF_ROWS = 50;
  const COLOR_OF_ALIVE = 'white';
  const COLOR_OF_DEAD = 'black';

  Game = new GameOfLifeClass(NUMBER_OF_COLUMNS, NUMBER_OF_ROWS, COLOR_OF_ALIVE,
    COLOR_OF_DEAD, document.getElementById('game'));
    drawOnScreen();
}

/**
 * @description Función que avanza un ciclo en la partida.
 */
const nextGeneration = () => {
  Game.generateNextState();
  drawOnScreen();
}

/**
 * @description Función que genera un estado aleatorio de partida dándole a cada
 * célula un estado aleatorio.
 */
const randomizeState = () => {
  Game.generateRandomCellStates();
  drawOnScreen();
}

/**
 * @description Función que da vida a un número determinado de células
 * del tablero que estén muertas.
 */
const makeNCellsAlive = () => {
  const numberOfCellsToAdd = document.getElementById("cells-to-introduce").value;
  if (!isNaN(numberOfCellsToAdd)) {
    Game.generateNCellsAlive(Math.floor(numberOfCellsToAdd));
    drawOnScreen();
  }
}

/**
 * @description Función que inicia la ejecución recursiva y pone el valor
 * del flag de parada a falso.
 */
const startAutoRun = () => {
  stop = false;
  recursiveGame();
}

/**
 * @description Función que para la ejecución recursiva cambiando el valor
 * del flag de parada a verdadero.
 */
const stopAutoRun = () => {
  stop = true;
}

/**
 * @description Función que se encarga de dibujar la información necesaria
 * en pantalla. COncretamente llama a la función de dibujado del tablero en
 * pantalla y llama a la función que escribe el estado de células vivas/muertas
 * en pantalla
 */
const drawOnScreen = () => {
  Game.drawState();
  writeCellsConfiguration();
}

/**
 * @description Función recursiva que mientras el flag de parada no esté a
 * verdadero sigue generando la siguiente configuración de la partida.
 */
async function recursiveGame() {
  while(!stop) {
    await sleep(baseSpeed - variableSpeed);
    nextGeneration();
  }
}

/**
 * @description Función que pausa la partida durante un número de milisegundos.
 * @param {int} msToWait Número de milissegundo a esperar.
 */
const sleep = (msToWait) => {
    return new Promise(resolve => setTimeout(resolve, msToWait))
}

/**
 * @description Función que hace variar la velocidad del programa actualizando
 * el valor de la variable variableSpeed en base al porcentaje del slider
 * en el HTML.
 */
const updateSlider = () => {
  const slider = document.getElementById("speed");
  variableSpeed = slider.value;
}

/**
 * @description Función que modifica el contenido de alive-text y dead-text
 * en el HTML para que contengan el valor de células vivas y muertas que contiene
 * la partida.
 */
const writeCellsConfiguration = () => {
  let alive = document.getElementById("alive-text");
  let dead = document.getElementById("dead-text");
  alive.textContent = `Células vivas: ${Game.currentGrid.aliveCells}`;
  dead.textContent = `Células muertas: ${Game.currentGrid.deadCells}`;
}

const baseSpeed = document.getElementById("speed").max;
let Game = null;
let stop = false;
let variableSpeed = document.getElementById("speed").value;