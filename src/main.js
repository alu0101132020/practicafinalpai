/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 13. Bouncing Ball. Programación Gráfica, Orientada a Objetos y dirigida por eventos en JS.
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 16/05/2020
 *  @desc Programa principal.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P13-BouncingBall/blob/master/2019-2020_p13_BouncingBall.md
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/pai-p13-bouncing-ball-alu0101132020
 *
 *  @file Fichero que contiene la implementación de la clase pantalla.
 *
 *  @version  16/05/2020 - Creación (primera versión) del código.
 */

'use strict';


let BouncingScreenClass = null;

if (typeof(window) === 'undefined') {
  BouncingScreenClass = require('../src/bouncing-screen');
} else {
  BouncingScreenClass = BouncingScreen;
}

/**
 * @description Función que inicia la bola y empieza la animación.
 */
const start = () => {
  let start = document.getElementById('start-stop');
  start.textContent = 'Stop';
  screen = new BouncingScreenClass(document.getElementById('bounce'));
  screen.animation();
  drawTime();
}

/**
 * @description Función que detiene la animación mediante la manipulación de un
 * booleano.
 */
const stop = () => {
  let start = document.getElementById('start-stop');
  start.textContent = 'Resume';
  screen.stop = true;
}

/**
 * @description Función que continua la animación por el punto donde iba.
 */
const resume = () => {
  let start = document.getElementById('start-stop');
  start.textContent = 'Stop';
  screen.stop = false;
  screen.animation();
  drawTime();
}

/**
 * @description Función que modifica el color html del fondo.
 */
const backgroundHTML = () => {
  const color = document.getElementById('background');
  screen.backgroundColor = color.value;
}

/**
 * @description Función que modifica el color html del fondo.
 */
const colorBall = () => {
  const color = document.getElementById('colorball');
  if (color.value === 'Random') {
    screen.balls[0].color = screen.getRandomColor();
  } else if (color.value === 'By speed') {

  } else {
    screen.balls[0].color = color.value;
  }
}

/**
 * @description Función que controla las modificaciones sobre la velocidad
 * en el slider.
 */
const updateSlider = () => {
  const slider = document.getElementById('time-slider');
  variableSpeed = slider.value;
  const value = document.getElementById('time-step-value');
  value.textContent = variableSpeed;
  screen.delay = baseSpeed - variableSpeed;
}

/**
 * @description Función que escribe el tiempo que lleva la simulación
 */
async function drawTime () {
  while(true) {
    await sleep(50);
    const time = document.getElementById('time-string');
    time.textContent = screen.time;
    console.log(time.textContent);
  }
}

/**
 * @description Función que pausa la partida durante un número de milisegundos.
 * @param {int} msToWait Número de milissegundo a esperar.
 */
const sleep = (msToWait) => {
  return new Promise(resolve => setTimeout(resolve, msToWait))
}

let screen;

const baseSpeed = document.getElementById("time-slider").max;
let variableSpeed = document.getElementById("time-slider").value;
let state = null;