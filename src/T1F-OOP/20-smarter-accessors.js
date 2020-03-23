/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author       F. de Sande
 * @since 20.feb.2020
 * @desc Smarter accessors
 * @tutorial {@link https://javascript.info/property-accessors#smarter-getters-setters}
 */

"use strict"

/**
 * Getters/setters can be used as wrappers over “real” property values to gain more control over operations with them
 * The name is stored in _name property, and the access is done via getter and setter
 * Technically, external code is able to access the name directly by using user._name
 * But there is a widely known convention that properties starting with 
 * an underscore "_" are internal and should not be touched from outside the object
 */
const MIN_NAME_LENGHT = 4;

let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < MIN_NAME_LENGHT) {
      console.log("Name is too short, need at least 4 characters");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
console.log(user.name);			// Pete
user.name = ""; 						// Name is too short...
console.log(user);
