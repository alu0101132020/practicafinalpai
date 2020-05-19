/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 8. Poker. OOP
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 09/04/2020
 *  @desc Implementación de la clase valores de las cartas
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P08-Poker/blob/master/2019-2020_p08_Poker.md
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-8-poker-alu0101132020
 *
 *  @file Fichero que contiene la implementación del código que genera los valores que puede
 * tener una carta
 *
 *  @version  09/04/2020 - Creación (primera versión) del código.
 */

'use strict';

/**
 * @description Clase valor.
 */
class Ranks {
  /**
   * @description Constructor de la clase valor de carta.
   * @param {string} rank - valor de la carta.
   */
  constructor (rank) {
    this._value = -1;
    if (this.validRanks(rank))
      this._rank = rank;
    else {
      this._rank = 'UNDEFINED RANK';
    }
  }

  /**
   * @description Función que verifica si el valor de la carta es válido y
   * en caso de serlo establece el valor.
   * @param {string} rank String que contiene el valor de la carta.
   * @return {bool} retorna si el valor de la carta es válido. 
   */
  validRanks(rank) {
    const VALIDRANKS = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
    let currentValue = 0;
    let checkBool = false;
    VALIDRANKS.forEach((currentRank => {
      if (currentRank === rank) {
        checkBool = true;
        this._value = currentValue;
      } else {
        currentValue++;
      }
    }));
    return checkBool;
  }
  
  /**
   * @description getter del valor
   * @return {string} Retorna el valor de la carta.
   */
  get value() {
    return this._value;
  }

  /**
   * @description getter del valor
   * @return {string} Retorna el valor de la carta.
   */
  toString() {
    return this._rank;
  }
};