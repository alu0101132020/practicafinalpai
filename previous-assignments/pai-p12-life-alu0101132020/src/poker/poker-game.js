/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 8. Poker. OOP
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 09/04/2020
 *  @desc Implementación del programa principal de que calcula probabilidades
 *  de partida de poker.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P08-Poker/blob/master/2019-2020_p08_Poker.md
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-8-poker-alu0101132020
 *
 *  @file Fichero que contiene la implementación del código que calcula probabildiades
 *  de manos de poker.
 *
 *  @version  09/04/2020 - Creación (primera versión) del código.
 */

'use strict';

const WIDTH_OF_CANVAS = 1920;
const HEIGHT_OF_CANVAS = 720;
const LINE_WIDTH = 2;
const BLACK_COLOR = 'black';
const X_CHART_START = 50;
const Y_CHART_START = 75;
const X_OFFSET = 300;
const Y_OFFSET = 50;
const Y_MSG_STRING = 50;
const STRING_X_OFFSET = 10;
const STRING_Y_OFFSET = 25;
const MYFONT = '15px Arial';

const main = () => {
  const HAND_POSSIBILITIES = [
    'High Card', 'Pair', 'Two Pair',
    'Three Of A Kind', 'Straight', 'Flush',
    'Full House', 'Four Of A Kind', 'Straight Flush'
  ];
  const NUMBER_OF_HANDS_TO_DEAL = 2;
  const NUMBER_OF_CARDS_FROM_A_HAND = 5;
  const NUMBER_OF_GAMES_TO_ESTIMATE_HAND_CHANCE = 1;
  const POKER_SUITS = ['clubs', 'diamonds', 'hearts', 'spades'];
  const POKER_RANKS = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
  for (let currentGame = 0; currentGame < NUMBER_OF_GAMES_TO_ESTIMATE_HAND_CHANCE; currentGame++) {
    let POKER_DECK = new Deck(POKER_SUITS, POKER_RANKS);
    playGame(POKER_DECK, results, NUMBER_OF_HANDS_TO_DEAL, NUMBER_OF_CARDS_FROM_A_HAND, HAND_POSSIBILITIES);
  }
  // Uso de canvas para mostrar por pantalla.

  results[0].drawHand(canvas);
  results[1].drawHandsTurned(canvas2);
}

/**
 * @description Función que hace el reparto de cartas de una partida y
 * lleva el recuento de la mejor jugada de cada mano en el array de resultados.
 * @param {deck} deck mazo que se va a repartir
 * @param {array} results array de resultados que llevará el recuento del número
 * de veces que ha salido cada jugada.
 * @param {int} numberHands número de manos a repartir.
 * @param {int} numberCardsPerHand número de cartas que tendrá cada mano repartida
 * @param {array} handPossibilities todas las jugadas posibles de una mano.
 */
const playGame = (deck, results, numberHands, numberCardsPerHand, handPossibilities) => {
  let allHands = deck.dealHands(numberHands, numberCardsPerHand);
  for (const currentHand of allHands) {
    results.push(currentHand);
  }
  console.log(results);
}

/**
 * @description Función que le da la vuelta a las cartas dependiendo de la altura
 * a la que se clicka y la coordenada X.
 * @param {Evento} event 
 */
function swapCard(event) {
  const xCoordinate = event.clientX;
  const yCoordinate =  event.clientY;
  if (yCoordinate < canvas.height * 0.8) {
    results[0].swapCard(canvas, xCoordinate, yCoordinate);
  } else {
    results[1].swapCard(canvas2, xCoordinate, yCoordinate);
  }
}


document.addEventListener("click", swapCard);

let results = [];

const canvas2 =  document.getElementById('second-set');
const canvas = document.getElementById('first-set');