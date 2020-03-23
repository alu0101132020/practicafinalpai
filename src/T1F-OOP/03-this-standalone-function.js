/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author       F. de Sande
 * @since 20.feb.2020
 * @desc this in a function not attached to an object
 */

// "use strict"							// If you use strict, line 14 is an error

outside = 5;                // Declaring without var / let-const

let myFunc = function() {
  console.log(this.outside);
}

myFunc();		// →  5  this is the global object!
