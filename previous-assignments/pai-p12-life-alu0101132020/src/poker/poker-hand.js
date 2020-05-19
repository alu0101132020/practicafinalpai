/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 8. Poker. OOP
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 09/04/2020
 *  @desc Implementación de la clase mano de póquer.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P08-Poker/blob/master/2019-2020_p08_Poker.md
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-8-poker-alu0101132020
 *
 *  @file Fichero que contiene la implementación del código que implementa una mano de póquer.
 *
 *  @version  09/04/2020 - Creación (primera versión) del código.
 */

'use strict';

/**
 * @description Clase mano de póker.
 */
class PokerHand extends Hand {

  /**
   * @description Función que modifica la etiqueta de
   * la mano en base a la jugada más alta que se puede
   * conseguir con la mano que se tiene.
   */
  classify() {
    if(this.hasStraightFlush()) {
      this._label = 'Straight Flush';
    } else if (this.hasFourOfAKind()) {
      this._label = 'Four Of A Kind';
    } else if (this.hasFullHouse()) {
      this._label = 'Full House';
    } else if (this.hasFlush()) {
      this._label = 'Flush';
    } else if (this.hasStraight()) {
      this._label = 'Straight';
    } else if (this.hasThreeOfAKind()) {
      this._label = 'Three Of A Kind';
    } else if (this.hasTwoPair()) {
      this._label = 'Two Pair';
    } else if (this.hasPair()) {
      this._label = 'Pair';
    } else {
      this._label = 'High Card';
    }
  }

  /**
   * @description Función que verifica si se contiene una pareja.
   * @return {bool} Booleano que confirma si se cumple el criterio
   * para que exista esta jugada.
   */
  hasPair() {
    for (let currentFirstCard = 0; currentFirstCard < this.cards.length; currentFirstCard++) {
      for (let currentSecondCard = currentFirstCard + 1; currentSecondCard < this.cards.length; currentSecondCard++) {
        if (this.cards[currentFirstCard].rank === this.cards[currentSecondCard].rank) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * @description Función que verifica si se contiene una doble pareja.
   * @return {bool} Booleano que confirma si se cumple el criterio
   * para que exista esta jugada.
   */
  hasTwoPair() {
    let copyOfHand = this.cards.slice();
    let foundFirstPair = false;
    for (let currentFirstCard = 0; currentFirstCard < copyOfHand.length; currentFirstCard++) {
      for (let currentSecondCard = currentFirstCard + 1; currentSecondCard < copyOfHand.length; currentSecondCard++) {
        if (copyOfHand[currentFirstCard].rank === copyOfHand[currentSecondCard].rank) {
          foundFirstPair = true;
          copyOfHand.splice(currentFirstCard, 1);
          copyOfHand.splice(currentSecondCard - 1, 1);
          break;
        }
      }
      if (foundFirstPair) {
        break;
      }
    }
    if (foundFirstPair) {
      for (let currentFirstCard = 0; currentFirstCard < copyOfHand.length; currentFirstCard++) {
        for (let currentSecondCard = currentFirstCard + 1; currentSecondCard < copyOfHand.length; currentSecondCard++) {
          if (copyOfHand[currentFirstCard].rank === copyOfHand[currentSecondCard].rank) {
            return true;
          }
        }
      }
      return false;
    } else {
      return false;
    }
  }

  /**
   * @description Función que verifica si se contiene un trio.
   * @return {bool} Booleano que confirma si se cumple el criterio
   * para que exista esta jugada.
   */
  hasThreeOfAKind() {
    for (let currentFirstCard = 0; currentFirstCard < this.cards.length; currentFirstCard++) {
      for (let currentSecondCard = currentFirstCard + 1; currentSecondCard < this.cards.length; currentSecondCard++) {
        for (let currentThirdCard = currentSecondCard + 1; currentThirdCard < this.cards.length; currentThirdCard++) {
          if (this.cards[currentFirstCard].rank === this.cards[currentSecondCard].rank && 
              this.cards[currentFirstCard].rank === this.cards[currentThirdCard].rank) {
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   * @description Función que verifica si se contiene un color
   * @return {bool} Booleano que confirma si se cumple el criterio
   * para que exista esta jugada.
   */
  hasFlush() {
    const NUMBER_OF_CARDS_THAT_DEFINE_A_FLUSH = 5;
    this.sort();
    let currentSuit = this.cards[0].suit;
    let counterOfFlush = 0;
    for (let currentFirstCard = 0; currentFirstCard < this.cards.length; currentFirstCard++) {
      if (this.cards[currentFirstCard].suit === currentSuit) {
        counterOfFlush++;
        if (counterOfFlush === NUMBER_OF_CARDS_THAT_DEFINE_A_FLUSH) {
          return true;
        }
      } else {
        currentSuit = this.cards[currentFirstCard].suit;
        counterOfFlush = 1;
      }
    }
    return false;
  }

  /**
   * @description Función que verifica si se contiene una escalera.
   * @return {bool} Booleano que confirma si se cumple el criterio
   * para que exista esta jugada.
   */
  hasStraight() {
    const NUMBER_OF_CARDS_THAT_DEFINE_A_STRAIGHT = 5;
    const MAX_CARD_VALUE = 12;
    let includesAce = false;
    this.sortByRank();
    for (let currentCard = 0; currentCard < this.cards.length; currentCard++) {
      let foundStraightCards = 1;
      let lastCardRank = this.cards[currentCard]._rank.value;
      for (let checkingCard = 0; checkingCard < this.cards.length; checkingCard++) {
        if (!includesAce && this.cards[currentCard]._rank.value === 0) {
          includesAce = true;
        }
        if (this.cards[checkingCard]._rank.value === lastCardRank + 1) {
          foundStraightCards++;
          lastCardRank++;
          checkingCard = 0;
          if (foundStraightCards === NUMBER_OF_CARDS_THAT_DEFINE_A_STRAIGHT) {
            return true;
          } else if (foundStraightCards === 4 && lastCardRank === MAX_CARD_VALUE &&
            includesAce) {
              return true;
            }
        }
      }
    }
    return false;
  }

  /**
   * @description Función que verifica si se contiene un full house.
   * @return {bool} Booleano que confirma si se cumple el criterio
   * para que exista esta jugada.
   */
  hasFullHouse() {
    let copyOfHand = this.cards.slice();
    let foundThreeOfAKind = false;
    for (let currentFirstCard = 0; currentFirstCard < this.cards.length; currentFirstCard++) {
      for (let currentSecondCard = currentFirstCard + 1; currentSecondCard < this.cards.length; currentSecondCard++) {
        for (let currentThirdCard = currentSecondCard + 1; currentThirdCard < this.cards.length; currentThirdCard++) {
          if (this.cards[currentFirstCard].rank === this.cards[currentSecondCard].rank && 
              this.cards[currentFirstCard].rank === this.cards[currentThirdCard].rank) {
              foundThreeOfAKind = true;
              copyOfHand.splice(currentFirstCard, 1);
              copyOfHand.splice(currentSecondCard - 1, 1);
              copyOfHand.splice(currentThirdCard - 2, 1);
              break;
          }
        }
        if (foundThreeOfAKind) {
          break;
        }
      }
    }
    if (foundThreeOfAKind) {
      for (let currentFirstCard = 0; currentFirstCard < copyOfHand.length; currentFirstCard++) {
        for (let currentSecondCard = currentFirstCard + 1; currentSecondCard < copyOfHand.length; currentSecondCard++) {
          if (copyOfHand[currentFirstCard].rank === copyOfHand[currentSecondCard].rank) {
            return true;
          }
        }
      }
      return false;
    } else {
      return false;
    }
  }

  /**
   * @description Función que verifica si se contiene un cuarteto.
   * @return {bool} Booleano que confirma si se cumple el criterio
   * para que exista esta jugada.
   */
  hasFourOfAKind() {
    const NUMBER_OF_DIFFERENT_CARDS = 13;
    let cardCounter = [];
    for (let currentCardType = 0; currentCardType < NUMBER_OF_DIFFERENT_CARDS; currentCardType++) {
      cardCounter.push(0);
    }
    for (let currentCard = 0; currentCard < this.cards.length; currentCard++) {
      cardCounter[this.cards[currentCard]._rank.value]++;
      if (cardCounter[this.cards[currentCard]._rank.value] === 4) {
        return true;
      }
    }
    return false;
  }

  /**
   * @description Función que verifica si se contiene una escalera de color.
   * @return {bool} Booleano que confirma si se cumple el criterio
   * para que exista esta jugada.
   */
  hasStraightFlush() {
    const NUMBER_OF_CARDS_THAT_DEFINE_A_FLUSH = 5;
    const MAX_CARD_VALUE = 12;
    this.sort();
    let currentSuit = this.cards[0].suit;
    let counterOfFlush = 0;
    let lastCardRank = this.cards[0]._rank.value;
    let includesAce = false;
    for (let currentFirstCard = 0; currentFirstCard < this.cards.length; currentFirstCard++) {
      if (this.cards[currentFirstCard].suit === currentSuit && 
        this.cards[currentFirstCard]._rank.value === 0) {
          includesAce = true;
        }
      if (this.cards[currentFirstCard].suit === currentSuit && 
          this.cards[currentFirstCard]._rank.value === lastCardRank + 1 ) {
        counterOfFlush++;
        lastCardRank = this.cards[currentFirstCard]._rank.value;
        if (counterOfFlush === NUMBER_OF_CARDS_THAT_DEFINE_A_FLUSH) {
          return true;
        } else if (counterOfFlush === NUMBER_OF_CARDS_THAT_DEFINE_A_FLUSH - 1
           && lastCardRank === MAX_CARD_VALUE && includesAce) {
            return true;
          }
      } else {
        let oldSuit = currentSuit;
        currentSuit = this.cards[currentFirstCard].suit;
        counterOfFlush = 1;
        lastCardRank = this.cards[currentFirstCard]._rank.value;
        if (oldSuit != currentSuit) {
          includesAce = false;
        }
      }
    }
    return false;
  }
};