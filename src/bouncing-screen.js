/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 13. Bouncing Ball. Programación Gráfica, Orientada a Objetos y dirigida por eventos en JS.
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 13/05/2020
 *  @desc Clase pantalla.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P13-BouncingBall/blob/master/2019-2020_p13_BouncingBall.md
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/pai-p13-bouncing-ball-alu0101132020
 *
 *  @file Fichero que contiene la implementación de la clase pantalla.
 *
 *  @version  13/05/2020 - Creación (primera versión) del código.
 */

'use strict';

let BallClass = null;

if (typeof(window) === 'undefined') {
  BallClass = require('../src/ball');
} else {
  BallClass = Ball;
}

const BALL_RADIUS = 5;
const BLACK_COLOR_BALL_SCREEN = 'black';
/**
 * @description Clase pantalla. Una pantalla estará definida por las dimensiones
 * de un canvas y contendrá una pelota que se moverá a lo largo de la pantalla
 * rebotando en los bordes.
 */
class BouncingScreen {
  constructor(canvas) {
    this.maxX = canvas.width;
    this.maxY = canvas.length;
    this.ball = new BallClass(canvas.width / 2, canvas.length / 2, BALL_RADIUS,
      BLACK_COLOR_BALL_SCREEN);
  }
}