/* eslint-disable max-len */
/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 7. Mandelbrot. Gráficos en JS usando canvas.
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 01/04/2020
 *  @desc Implementación del código que resuelve el problema02 de la hora de prácticas.
 *  prácticas.
 *  References:
 *               Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P07-Mandelbrot/blob/master/2019-2020_p07_Mandelbrot.md
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-07-mandelbrot-alu0101132020
 *
 *  @file Dibujo señal de estop
 *
 *  @version  01/04/2020 - Creación (primera versión) del código.
 */
'use strict';

const WIDTH_OF_CANVAS = 1920;
const HEIGHT_OF_CANVAS = 720;
const MEDIUM_HEIGHT = HEIGHT_OF_CANVAS / 2;
const MEDIUM_WIDTH = WIDTH_OF_CANVAS / 2;
const BLACK_COLOR = 'black';
const WHITE_COLOR = 'white';
const RED_COLOR = 'red';
const OUTSIDE_CIRCLE_RADIUS = 100;
const MEDIUM_CIRCLE_RADIUS = 95;
const INSIDE_CIRCLE_RADIUS = 93;
const OFF_SET_OF_LINE_FROM_CENTER = 70;
const LINE_WIDTH = 40;

/**
 * @description - Función que dibuja una circunferencia con un color radio y punto dado.
 * @param {contexto} ctx 
 * @param {Point} point 
 * @param {int} radius 
 * @param {color} color 
 */
const drawArc = (ctx, point, radius, color) => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
  ctx.fill();
}

const drawLine = (ctx, pointOne, pointTwo, lineWidth, colorLine = WHITE_COLOR) => {
  ctx.beginPath();
  ctx.moveTo(pointOne.x, pointOne.y);
  ctx.lineTo(pointTwo.x, pointTwo.y);
  ctx.closePath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = colorLine;
  ctx.stroke();
}

const draw = () => {
  const canvas = document.getElementById('dibujoEjercicio02');
  canvas.width = WIDTH_OF_CANVAS;
  canvas.height = HEIGHT_OF_CANVAS;
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    const centerPoint = new Point (MEDIUM_WIDTH, MEDIUM_HEIGHT);
    drawArc(ctx, centerPoint, OUTSIDE_CIRCLE_RADIUS, RED_COLOR);
    drawArc(ctx, centerPoint, MEDIUM_CIRCLE_RADIUS, WHITE_COLOR);
    drawArc(ctx, centerPoint, INSIDE_CIRCLE_RADIUS, RED_COLOR);
    const leftPoint = new Point(MEDIUM_WIDTH - OFF_SET_OF_LINE_FROM_CENTER, MEDIUM_HEIGHT);
    const rightPoint = new Point(MEDIUM_WIDTH + OFF_SET_OF_LINE_FROM_CENTER, MEDIUM_HEIGHT);
    drawLine(ctx, leftPoint, rightPoint, LINE_WIDTH, WHITE_COLOR);
  }
};