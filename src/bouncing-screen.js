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

const BALL_RADIUS = 20;
const BORDER_COLOR = 'black';
const BACKGROUND_COLOR = 'white';
const NUMBER_OF_BALLS = 1;
/**
 * @description Clase pantalla. Una pantalla estará definida por las dimensiones
 * de un canvas y contendrá una pelota que se moverá a lo largo de la pantalla
 * rebotando en los bordes.
 */
class BouncingScreen {
  /**
   * @description Constructor principal, que a partir de un canvas instancia
   * las dimensiones de la pantalla e incializa una pelota en el centro de la
   * pantalla.
   * @param {canvas} canvas Canvas sobre el que se dibujará la pelota y que hará
   * de pantalla sobre la que se rebota
   */
  constructor(canvas, color) {
    this.maxX = canvas.width;
    this.maxY = canvas.height;
    this.balls = [];
    for (let currentBall = 0; currentBall < NUMBER_OF_BALLS; currentBall++) {
      let ball = new BallClass((this.maxX - BALL_RADIUS) * Math.random(),
        (this.maxY - BALL_RADIUS) * Math.random(), BALL_RADIUS,
        this.getRandomColor());
      // Comprobamos que la pelota no esté fuera por ninguno de los dos lados.
      if (ball.position.x - ball.radius < 0) {
        ball.position.x = BALL_RADIUS;
      }
      if (ball.position.y - ball.radius < 0) {
        ball.position.y = BALL_RADIUS;
      }
      this.balls.push(ball);
    }
    this.canvas = canvas;
    this.backgroundColor = BACKGROUND_COLOR;
    this.borderColor = BORDER_COLOR;
    this.delay = 10;
    this.time = 0;
    this.stop = false;
  }

  /* istanbul ignore next */
  /**
   * @description Función que dibuja la pelota en pantalla.
   */
  drawScreen() {
    this.drawBackground();
    for (const ball of this.balls) {
     ball.drawBall(this.canvas);
    }
  }



  /* istanbul ignore next */
  /**
   * @description Función que se encarga de pintar el fondo, útil para dar la
   * sensación de animación.
   */
  drawBackground() {
    const ctx = this.canvas.getContext('2d');
    ctx.beginPath();
    ctx.rect(0, 0, this.maxX, this.maxY);
    ctx.fillStyle = this.backgroundColor;
    ctx.fill();
    ctx.strokeStyle = this.borderColor;
    ctx.stroke();
  }

  /**
   * @description Función que se encarga de controlar el movimiento de la pelota.
   */
  nextFrame() {
    this.time += this.delay;
    this.checkBordersReached();
    for (const ball of this.balls) {
      ball.updatePosition();
    }
  }

  /* istanbul ignore next */
  /**
   * @description Función recursiva que mientras el flag de parada no esté a
   * verdadero sigue generando la siguiente configuración de la partida.
   */
  async animation() {
    while(!this.stop) {
      await this.sleep(this.delay);
      this.drawScreen();
      this.nextFrame();
    }
  } 
 
  /* istanbul ignore next */
  /**
   * @description Función que pausa la partida durante un número de milisegundos.
   * @param {int} msToWait Número de milissegundo a esperar.
   */
  sleep = (msToWait) => {
    return new Promise(resolve => setTimeout(resolve, msToWait))
  }

  /* istanbul ignore next */
  /**
   * @description Función que retorna un color aleatorio en el espectro rgb
   * generando para cada una de las 3 componentes un valor aleatorio
   * entre 0 y 255
   */
  getRandomColor() {
    const red = Math.floor(256 * Math.random());
    const green = Math.floor(256 * Math.random());
    const blue = Math.floor(256 * Math.random());
    return 'rgb(' + red + ',' + green + ',' + blue + ')';
}

  /* istanbul ignore next */
  /**
   * @description Función que comprueba si la pelota ha llegado a alguno de los
   * bordes de la pantalla. Si lo ha hecho invierte la dirección del eje en el
   * que ha llegado moviéndose la pelota.
   */
  checkBordersReached() {
    for (const ball of this.balls) {
      if (ball.position.x + ball.radius > this.maxX) {
        // ball.color = this.getRandomColor();
        ball.direction.x *= -1;
      } else if (ball.position.x - ball.radius < 0) {
        // ball.color = this.getRandomColor();
        ball.direction.x *= -1;
      }
      if (ball.position.y + ball.radius > this.maxY) {
        // ball.color = this.getRandomColor();
        ball.direction.y *= -1;
      } else if (ball.position.y - ball.radius < 0) {
        // ball.color = this.getRandomColor();
        ball.direction.y *= -1;
      }
      }
    }
}

if (typeof(window) === 'undefined') {
  module.exports = BouncingScreen;
}