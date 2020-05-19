/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 8. Poker. OOP
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 09/04/2020
 *  @desc Implementación de la clase baraja
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P08-Poker/blob/master/2019-2020_p08_Poker.md
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-8-poker-alu0101132020
 *
 *  @file Fichero que contiene la implementación del código que implementa la baraja.
 *
 *  @version  09/04/2020 - Creación (primera versión) del código.
 */

'use strict';

/**
 * @description clase que define un mazo de cartas.
 */
class Deck extends setOfCards {
  /**
   * @description Función que reparte a partir de un mazo
   * un conjunto de manos y lo retorna en forma de array de manos.
   * @param {int} numberOfHands numero de manos a repartir
   * @param {int} numberOfCards numero de cartas que tendrá cada
   * mano
   * @return {array} Conjunto de manos que se retornan.
   */
  dealHands(numberOfHands, numberOfCards) {
    this.shuffle();
    let arrayOfHands = [];
    for (let currentHand = 0; currentHand < numberOfHands; currentHand++) {
      arrayOfHands.push(new PokerHand(`Hand number ${currentHand}`));
      this.moveCards(arrayOfHands[currentHand], numberOfCards);
    }
    return arrayOfHands;
  }
};