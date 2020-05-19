/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 11 PAI - Ajedrez. Programación Gráfica y Orientada a Objetos en JS.
 *  @author: Manuel Andrés Carrera Galafate
 *  @since 02/05/2020
 *  @desc Programa principal.
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

let DrawableChessBoardQueensClass = null;
let DrawableChessBoardClass2 = null;

if (typeof(window) === 'undefined') {
  DrawableChessBoardQueensClass = require('../src/drawable-queens-chess-board');
  DrawableChessBoardClass2 = require('../src/drawable-chessboard');
} else {
  DrawableChessBoardQueensClass = DrawableChessBoardQueens;
  DrawableChessBoardClass2 = DrawableChessBoard;
}

/**
 * @description Función que crea un tablero de ajedrez clásico con sus fichas 
 * y lo dibuja en el canvas.
 */
const printNormalBoard = () => {
  const board = new DrawableChessBoardClass2(8, 8);
  board.printBoard();
  if (copySolutions != null) {
    clearUnnecesaryInfo();
  }
}

/**
 * @description Función que crea un tablero de ajedrez y hace que se dibuje vacío.
 */
const printEmptyBoard = () => {
  const board = new DrawableChessBoardClass2(8, 8);
  board.drawEmptyBoard();
  if (copySolutions != null) {
    clearUnnecesaryInfo();
  }
}

/**
 * @description Función que crea una instancia del problema de las 8 reinas, lo resuelve
 * y almacena el resultado en la variable copySolutions, que es una copia de todas
 * las soluciones del problema. Esta se usará para dibujarlas en el canvas más adelante.
 */
const generateQueensProblem = () => {
  let generalized = document.getElementById("checkmark").checked;
  const board = new DrawableChessBoardQueensClass(8, 8, generalized);
  board.findSolutions(8);
  currentSolution = 0;
  copySolutions = board.solutions;
  document.getElementById('total-soluciones').innerHTML = `Total de soluciones encontradas: ${copySolutions.length}`;
}

/**
 * @description Función que muestra por pantalla la siguiente solución del 
 * problema y actualiza la solución mostrada actual en caso de que la copia de
 * las soluciones ya haya sido generada.
 */
const showNextSolution = () => {
  if (copySolutions != null) {
    document.getElementById('solucion-actual').innerHTML = `Solución mostrada: ${(currentSolution % copySolutions.length) + 1}`;
    const board = new DrawableChessBoardQueensClass(8, 8);
    board.printBoard(copySolutions[currentSolution % copySolutions.length]);
    board.printAlgebraicConfiguration(copySolutions[currentSolution % copySolutions.length]);
    currentSolution++;
  }
}

/**
 * @description Función que elimina la información no necesaria del html accediendo
 * al árbol DOM del HTML.
 */
const clearUnnecesaryInfo = () => {
  for (let currentP = 0; currentP < copySolutions.length; currentP++) {
    document.getElementById('caja-derecha').children[currentP].innerHTML = '';
  }
  document.getElementById('solucion-actual').innerHTML = '';
}

let copySolutions = null;
let currentSolution = 0;