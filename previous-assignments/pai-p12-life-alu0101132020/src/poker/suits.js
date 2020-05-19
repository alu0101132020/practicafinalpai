/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 8. Poker. OOP
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 09/04/2020
 *  @desc Implementación de la clase palos de la carta.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P08-Poker/blob/master/2019-2020_p08_Poker.md
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-8-poker-alu0101132020
 *
 *  @file Fichero que contiene la implementación del código que genera los palos de las cartas.
 *
 *  @version  09/04/2020 - Creación (primera versión) del código.
 */

'use strict';

/**
 * @description Clase palo.
 */
class Suits {
  /**
   * @description Constructor de la clase valor de carta.
   * @param {string} suit - valor de la carta.
   */
  constructor (suit) {
    this._value = -1;
    if (this.validSuits(suit))
      this._suit = suit;
    else {
      this._suit = 'UNDEFINED SUIT';
    }
  }

  /**
   * @description Función que verifica si el palo de la carta es válido y
   * en caso de serlo establece el palo.
   * @param {string} suit String que contiene el palo de la carta.
   * @return {bool} retorna si el palo de la carta es válido. 
   */
  validSuits(suit) {
    const VALIDSUITS = ['clubs', 'diamonds', 'hearts', 'spades'];
    let currentValue = 0;
    let checkBool = false;
    VALIDSUITS.forEach((currentsuit => {
      if (currentsuit === suit.toLowerCase()) {
        checkBool = true;
        this._value = currentValue;
      } else {
        currentValue++;
      }
    }));
    return checkBool;
  }

  /**
   * @description getter del palo
   * @return {string} Retorna el palo de la carta.
   */
  toString() {
    return this._suit;
  }

  /**
   * @description getter del palo
   * @return {string} Retorna el palo de la carta.
   */
  get value() {
    return this._value;
  };
}