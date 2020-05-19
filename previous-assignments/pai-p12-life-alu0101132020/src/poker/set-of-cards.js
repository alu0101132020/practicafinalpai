/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 8. Poker. OOP
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 09/04/2020
 *  @desc Implementación de un conjunto de cartas
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P08-Poker/blob/master/2019-2020_p08_Poker.md
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-8-poker-alu0101132020
 *
 *  @file Fichero que contiene la implementación del código que implementa un conjunto de cartas
 *
 *  @version  09/04/2020 - Creación (primera versión) del código.
 */

'use strict';

/**
 * @description Clase conjunto de cartas.
 */
class setOfCards {
  /**
   * @description Constructor de la clase conjunto de cartas
   * @param {array} suits - Conjunto de palos con el que
   * se construirá el conjunto de cartas.
   * @param {array} ranks - Conjunto de valores con el que
   * se construirá el conjunto de cartas.
   */
  constructor(suits, ranks) {
    this._cards = [];
    for (const suit of suits) {
      for (const rank of ranks) {
        this._cards.push(new Card(suit, rank));
      }
    }
  }

  /**
   * @description getter del array de las cartas.
   * @return {array} array de cartas.
   */
  get cards() {
    return this._cards;
  }

  /**
   * @description getter del array de strings que representa
   * a las cartas
   * @return {array} array de strings de las cartas.
   */
  getSetOfCards() {
    const allCards = [];
    for (const currentCard of this._cards) {
      allCards.push(currentCard.toString());
    }
    return allCards;
  }

  /**
   * @description función que escribe por pantalla el array
   * de strings de las cartas.
   */
  printSetOfCards() {
    console.log(this.getSetOfCards());
  }

  /**
   * @description función que elimina la última carta del mazo
   * y la retorna.
   * @return carta eliminada del mazo
   */
  popCard() {
    const auxiliarCard = this._cards[this._cards.length - 1];
    this._cards.pop()
    return auxiliarCard;
  }

  /**
   * @description función que añade una carta al mazo.
   * Se hace por el lado contrario por el que se eliminan las cartas.
   * @param {card} newcard Carta que se añadirá al mazo.
   */
  addCard(newcard) {
    this._cards.unshift(newcard);
  }

  /**
   * @description función que desordena el mazo.
   */
  shuffle() {
    let currentIndex =  this._cards.length;
    let temporaryValue = 0;
    let randomIndex = 0;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      temporaryValue = this._cards[currentIndex];
      this._cards[currentIndex] = this._cards[randomIndex];
      this._cards[randomIndex] = temporaryValue;
    }
  }

  /**
   * @description Función que ordena el mazo en base
   * a: primero el palo y después el valor de la carta.
   */
  sort() {
    this._cards.sort(this.sortFunction);
  }
  
  /**
   * @description Función de ordenación en base al valor
   * de las cartas, usando como valor de la carta primero
   * el palo de la carta y después el "valor numérico" de
   * la carta.
   * @param {card} a primera carta
   * @param {card} b segunda carta
   */
  sortFunction(a, b) {
    if (a.valueOf() < b.valueOf()) {
      return -1;
    } else if (a.valueOf() > b.valueOf()) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * @description Función que ordena el mazo en base
   * a: primero el valor y después el palo de la carta.
   */
  sortByRank() {
    this._cards.sort(this.sortFunctionByRank);
  }
  /**
   * @description Función de ordenación en base al valor
   * de las cartas, usando como valor de la carta primero
   * el "valor numérico" de la carta y después el palo de
   * la carta.
   * @param {card} a primera carta
   * @param {card} b segunda carta
   */
  sortFunctionByRank(a, b) {
    if (a.valueOfByRank() < b.valueOfByRank()) {
      return -1;
    } else if (a.valueOfByRank() > b.valueOfByRank()) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * @description Función que mueve cartas de un mazo a otro.
   * @param {hand} hand mano a la que se van a mover las cartas
   * @param {int} numberOfCards numero de cartas que se van a mover
   * a la otra mano.
   */
  moveCards(hand, numberOfCards) {
    if (numberOfCards <= this._cards.length) {
      while (0 < numberOfCards) {
        hand.addCard(this.popCard());
        numberOfCards--;
      }
    } else {
      return 'No se pueden mover más cartas de las que tiene la propia mano.';
    }
  }
};