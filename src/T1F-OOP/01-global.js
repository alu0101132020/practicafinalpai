/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author       F. de Sande
 * @since 20.feb.2020
 * @desc The global object in Node
 */

// "use strict";

// console.log(global)

function oopsGlobal() {
	mistake = "yup";             // Declaring a variable!! use strict   !!!
}

oopsGlobal();
console.log(mistake);
console.log(global.mistake);
