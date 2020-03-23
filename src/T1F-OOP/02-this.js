/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author       F. de Sande
 * @since 20.feb.2020
 * @desc The this binding. In methods, this refers to the object that the method was called on
 */

"use strict"

function speak() {
  if(this.nationality == "Japanese") {
    console.log("nyan");
  } else if (this.nationality == "American") {
    console.log("meow");
  } else {
    console.log("default cat noise");
  }
}

let japaneseCat = { nationality: "Japanese", speak: speak };
let americanCat = { nationality: "American", speak: speak };

japaneseCat.speak();		// →  nyan
americanCat.speak();		// →  meow
