/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author       F. de Sande
 * @since 20.feb.2020
 * @desc Private and protected properties and methods
 * @tutorial {@link https://javascript.info/private-protected-properties-methods#read-only-power}
 */

"use strict"

/**
 * NOTE: waterAmount has been moved into the constructor to work on NodeJS
 */
class CoffeeMachine {
  constructor(power) {
    this._power = power;
    this.waterAmount = 0;		// Call the setter
    console.log( `Created a coffee-machine, power: ${power}` );
  }

  setWaterAmount(value) {
    if (value < 0) throw new Error("Negative water");
    this._waterAmount = value;
  }

  getWaterAmount() {
    return this._waterAmount;
  }
}

let myCoffeeMachine = new CoffeeMachine(100).setWaterAmount(10);
console.log(myCoffeeMachine);

// create the coffee machine
// let coffeeMachine = new CoffeeMachine(100);
// console.log(`Power is: ${coffeeMachine.power}W`); 	// Power is: 100W

// add water
// coffeeMachine.waterAmount = -10; // Error: Negative water
// coffeeMachine.waterAmount = 10; // Error: Negative water

// coffeeMachine.power = 25; // Error (no setter)
