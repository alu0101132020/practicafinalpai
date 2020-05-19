/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 8. Poker. OOP
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 09/04/2020
 *  @desc Implementación de la clase mano de cartas.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P08-Poker/blob/master/2019-2020_p08_Poker.md
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-8-poker-alu0101132020
 *
 *  @file Fichero que contiene la implementación del código que implementa una mano de cartas.
 *
 *  @version  09/04/2020 - Creación (primera versión) del código.
 */

'use strict';

/**
 * @description Clase mano. Contiene una etiqueta para la mano
 * y un conjunto de cartas.
 */
class Hand extends setOfCards {
  /**
   * @description Constructor de una mano.
   * @param {string} label 
   */
  constructor(label) {
    super([],[]);
    this._label = label;
    this._cards = [];
  }
  /**
   * @description Función que retorna la etiqueta que define
   * la mano
   * @return Retorna la etiqueta de la mano
   */
  get label() {
    return this._label;
  }

  /**
   * @description Función que dibuja todas las cartas en su estado actual.
   * @param {*} canvas 
   */
  drawHand(canvas) {
    const distanceBetweenCards = canvas.width / this._cards.length;
    const startYOfCard = canvas.height / 10;
    const sizeOfXCard = canvas.width / this._cards.length * 0.75;
    const sizeOfYCard = canvas.height * 0.5;
    for (let currentCard = 0; currentCard < this._cards.length; currentCard++) {
      this._cards[currentCard].drawCard(canvas, distanceBetweenCards * currentCard, startYOfCard,
        sizeOfXCard, sizeOfYCard);
    }
  }

  /**
   * @Función que le da la vuelta a la carta alterando el booleano de la carta
   * y llama a su función para dibujarse.
   * @param {*} canvas 
   * @param {*} coordinateX 
   * @param {*} coordinateY 
   */
  swapCard(canvas, coordinateX, coordinateY) {
    // if(coordinateY < canvas.height) {
      const distanceBetweenCards = canvas.width / this._cards.length;
      const startYOfCard = canvas.height / 10;
      const sizeOfXCard = canvas.width / this._cards.length * 0.75;
      const sizeOfYCard = canvas.height * 0.5;
      const indexCard = Math.floor((coordinateX / distanceBetweenCards) / 2);
      if (this._cards[indexCard].swapped === true) {
        this._cards[indexCard].swapped = false;
      } else {
        this._cards[indexCard].swapped = true;
      }
      this._cards[indexCard].drawCard(canvas, distanceBetweenCards * indexCard, startYOfCard,
        sizeOfXCard, sizeOfYCard);
    // }
  }

  /**
   * @description Función que dibuja todas las cartas viradas.
   * @param {*} canvas 
   */
  drawHandsTurned(canvas) {
    const distanceBetweenCards = canvas.width / this._cards.length;
    const startYOfCard = canvas.height / 10;
    const sizeOfXCard = canvas.width / this._cards.length * 0.75;
    const sizeOfYCard = canvas.height * 0.5;
    for (let currentCard = 0; currentCard < this._cards.length; currentCard++) {
      this._cards[currentCard].swapped = true;
      this._cards[currentCard].drawCard(canvas, distanceBetweenCards * currentCard, startYOfCard,
        sizeOfXCard, sizeOfYCard);
    }
  }
};