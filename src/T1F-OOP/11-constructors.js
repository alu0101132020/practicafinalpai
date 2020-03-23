/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author       F. de Sande
 * @since 20.feb.2020
 * @desc Constructors
 */

"use strict"

/** 
 * both sadWerewolf and partyWerewolf are instances of Werewolf
 * Note that:
 * A property is added to the constructor's this object
 * this is the object that's returned after calling new Werewolf
 */
function Werewolf(mood) {
	this.mood = mood;
}

let sadWerewolf = new Werewolf('sad');
let partyWerewolf = new Werewolf('partying');
console.log(partyWerewolf.mood);
