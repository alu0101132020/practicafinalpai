/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author       F. de Sande
 * @since 20.feb.2020
 * @desc Object accessors
 * @tutorial {@link https://javascript.info/property-accessors}
 */

"use strict"

/**
 * fullName is a new property implemented through a getter
 * From outside, an accessor property looks like a regular one
 * We don’t call user.fullName as a function, we read it normally: the getter runs behind the scenes
 */
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

console.log(user.fullName); 		// → John Smith
console.log(user);							// fullName property has been added 
// user.fullName = "Test";         // Error (property has only a getter)
