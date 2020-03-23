/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author       F. de Sande
 * @since 20.feb.2020
 * @desc The global object
 */

// console.log(global);

function makeMessage() {
	// oops, forgot const / let   ... I'm a global!
	message = 'hello there';
}

makeMessage();
console.log(message);						// → hello there
console.log(global.message);		// → hello there
console.log(global.surprise); 

obj = {};
console.log(obj.unicorn);
