/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 8. Poker. OOP
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 09/04/2020
 *  @desc Implementación de la clase carta.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P08-Poker/blob/master/2019-2020_p08_Poker.md
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-8-poker-alu0101132020
 *
 *  @file Fichero que contiene la implementación del código que genera la clase carta.
 *
 *  @version  09/04/2020 - Creación (primera versión) del código.
 */

'use strict';

/**
 * @description clase carta (de juegos de cartas tradicionales.)
 */
class Card {
  /**
   * @description Constructor de la clase carta que recibe un palo
   * y un valor.
   * @param {string} suit - palo de la carta.
   * @param {string} rank - valor de la carta.
   */
  constructor (suit = 'Clubs', rank = '2') {
    this._suit = new Suits(suit);
    this._rank = new Ranks(rank);
    this._swapped = false;
  }

  /**
   * @description getter del valor de la carta.
   * @return {string} Retorna el valor de la carta.
   */
  get rank() {
    return this._rank._rank;
  }

  /**
   * @description getter del palo de la carta.
   * @return {string} Retorna el palo de la carta.
   */
  get suit() {
    return this._suit._suit;
  }

  /**
   * @description Función que "imprime la carta" como una string
   * compuesta por el valor y el palo de la carta.
   * @return {string} Retorna la cadena que representa la carta.
   */
  toString() {
    return `${this._rank.toString()} of ${this._suit.toString()}`;
  }

  /**
   * @description Función que retorna el valor de una carta teniendo
   * como primer criterio el palo.
   * @returns {int} Valor total de la carta.
   */
  valueOf() {
    return this._rank.value + this._suit.value * 13;
  }

  /**
   * @description Función que retorna el valor de una carta en base a
   * su valor de carta y no palo.
   * @returns {int} Valor total de la carta.
   */
  valueOfByRank() {
    return this._rank.value * 4 + this._suit.value;
  }

  /**
   * @description Función que se encarga de dibujar la carta, y dependiendo
   * de si está virada o no, dibujará su rango + palo, o dibujará el dorso
   * de la carta.
   * @param {*} canvas 
   * @param {*} xComponent 
   * @param {*} yComponent 
   * @param {*} width 
   * @param {*} height 
   */
  drawCard(canvas, xComponent, yComponent, width, height) {
    const ctx = canvas.getContext('2d');
    if (!this.swapped) {
      const ctx = canvas.getContext('2d');
      let image = new Image();
      let rankString;
      if (this.rank === 'Ace') {
        rankString = 'A';
      } else if (this.rank === 'Queen') {
        rankString = 'Q';
      } else if (this.rank === 'Jack') {
        rankString = 'J';
      } else if (this.rank === 'King') {
        rankString = 'K';
      } else {
        rankString = this.rank;
      }
      let suitString;
      if (this.suit === 'hearts') {
        suitString = 'H';
      } else if (this.suit === 'clubs') {
        suitString = 'C'
      } else if (this.suit === 'spades') {
        suitString = 'S';
      } else {
        suitString = 'D';
      }
      image.src = `../../img/poker-cards/${rankString}${suitString}.png`;
      image.onload = () => {
        ctx.drawImage(image, xComponent, yComponent, width, height);
      } 
    } else {
        let image = new Image();
        image.src = `../../img/poker-cards/gray_back.png`;
        image.onload = () => {
          ctx.drawImage(image, xComponent, yComponent, width, height);
        }
      }
    }
};