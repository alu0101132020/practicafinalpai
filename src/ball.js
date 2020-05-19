/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 13. Bouncing Ball. Programación Gráfica, Orientada a Objetos y dirigida por eventos en JS.
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 13/05/2020
 *  @desc Clase pelota.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P13-BouncingBall/blob/master/2019-2020_p13_BouncingBall.md
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/pai-p13-bouncing-ball-alu0101132020
 *
 *  @file Fichero que contiene la implementación de la clase pelota.
 *
 *  @version  13/05/2020 - Creación (primera versión) del código.
 */

'use strict';
const BLACK_COLOR_BALL = 'black';
let PointClass = null;

if (typeof(window) === 'undefined') {
  PointClass = require('../src/point');
} else {
  PointClass = Point;
}

const BASE_SPEED = 1;
const MAX_SPEED = 10;
/**
 * @description Clase pelota. Esta clase está preparada para ser dibujada en
 * un canvas en un HTML, para ello tiene definida una posición X y una posicón
 * Y necesarias para ubicarla en la web, tiene un radio para poder representar
 * el tamaño de la esfera y un color que le dará un acabado atractivo a la pelota.
 */
class Ball {
  /**
   * 
   * @param {int} positionX posición actual en el eje x del eje de coordenadas
   * que contenga la pelota.
   * @param {int} positionY posición actual en el eje y del eje de coordenadas
   * que contenga la pelota.
   * @param {int} radius radio de la pelota.
   * @param {string} color color de la pelota.
   */
  constructor(positionX = 0, positionY = 0, radius = 1, color = BLACK_COLOR_BALL) {
    this.position = new PointClass (positionX, positionY);
    this.radius = radius;
    this.color = color;
    // Valores que servirán para aleatorizar la dirección inicial.
    const randomX = Math.random() > 0.5 ? 1 : -1; 
    const randomY = Math.random() > 0.5 ? 1 : -1;
    this.direction = new PointClass (BASE_SPEED + Math.random() * MAX_SPEED * randomX,
      BASE_SPEED + Math.random() * MAX_SPEED * randomY);
  }

  /**
   * @description Función que actualiza la posición de la pelota en base a su
   * dirección actual.
   */
  updatePosition() {
    this.position.x += this.direction.x;
    this.position.y += this.direction.y;
  }

    /* istanbul ignore next */
  /**
   * @description Función que dibuja la pelota sobre un canvas usando las distintas
   * propiedades de la pelota.
   * @param {canvas} canvas Canvas sobre el que dibujar
   */
  drawBall(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

if (typeof(window) === 'undefined') {
  module.exports = Ball;
}