/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author       F. de Sande
 * @since 20.feb.2020
 * @desc Class Getters & Setters
 * @tutorial {@link https://javascript.info/class#getters-setters-other-shorthands}
 */

"use strict"

/**
 * Getters/setters can be used as wrappers over “real” property values to gain more control over operations with them
 * The name is stored in _name property, and the access is done via getter and setter
 * Technically, external code is able to access the name directly by using user._name
 * But there is a widely known convention that properties starting with an 
 * underscore "_" are internal and should not be touched from outside the object
 */
const MIN_NAME_LENGHT = 4;

class User {
  constructor(name) {
    // invokes the setter
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
	  console.log("The setter executing...");
    if (value.length < MIN_NAME_LENGHT) {
      console.log("Name is too short.");
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
console.log(user.name);						// John
user = new User("");							// Name is too short.
