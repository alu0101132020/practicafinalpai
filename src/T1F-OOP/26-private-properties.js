/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author       F. de Sande
 * @since 20.feb.2020
 * @desc Private and protected properties and methods
 * @tutorial {@link https://javascript.info/private-protected-properties-methods#private-waterlimit}
 *           {@link https://stackoverflow.com/questions/22156326/private-properties-in-javascript-es6-classes}
 */

"use strict"

/**
 * NOTE: Private fields (and methods) are being implemented in the ECMA standard. 
 * You can start using them today with babel 7 and stage 3 preset.
 */
class CoffeeMachine {
  #waterLimit = 200;

  #checkWater(value) {
    if (value < 0) throw new Error("Negative water");
    if (value > this.#waterLimit) throw new Error("Too much water");
  }

}

let coffeeMachine = new CoffeeMachine();

// can't access privates from outside of the class
// coffeeMachine.#checkWater(); // Error
// coffeeMachine.#waterLimit = 1000; // Error
