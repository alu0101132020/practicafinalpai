/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author       F. de Sande
 * @since 20.feb.2020
 * @desc Object.create first example
 */

"use strict"

// our "template" object
let protoWerewolf = {
  description: 'hairy',
  howl: function(thing) {
    console.log('Werewolf howls at the ' + thing + '.');
  }
};

// make a new werewolf with Object.create
let sadWerewolf = Object.create(protoWerewolf);
sadWerewolf.mood = 'sullen';
sadWerewolf.howl('moon');
