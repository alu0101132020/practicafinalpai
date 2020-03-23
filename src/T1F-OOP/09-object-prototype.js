/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author       F. de Sande
 * @since 20.feb.2020
 * @desc Object Prototype
 */

"use strict"

console.log(Object.getPrototypeOf({}) == Object.prototype);					// → true
console.log(Object.getPrototypeOf(Object.prototype));  							// → null

// function myFunc(x) { return x; }
// console.log(Object.getPrototypeOf(myFunc) == Function.prototype);   // → true
// console.log( Object.getPrototypeOf([1, 2, 3]) == Array.prototype);  // → true

console.log(Object.getPrototypeOf(Array.prototype) == Object.prototype);		// → true
