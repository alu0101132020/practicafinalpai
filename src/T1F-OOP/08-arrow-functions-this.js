/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author       F. de Sande
 * @since 20.feb.2020
 * @desc Arrow Functions have no this
 * @desc If we reference this from such a function, it’s taken from the outer “normal” function
 * @tutorial {@link https://javascript.info/object-methods}
 */

"use strict"

let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => console.log(this.firstName);
    arrow();
  }
};

user.sayHi();      // Ilya
