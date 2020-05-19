/* eslint-disable max-len */
/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 7. Mandelbrot. Gráficos en JS usando canvas.
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 01/04/2020
 *  @desc Implementación del código que resuelve el problema01 asignado en hora
 *  prácticas.
 *  References:
 *               Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P07-Mandelbrot/blob/master/2019-2020_p07_Mandelbrot.md
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-07-mandelbrot-alu0101132020
 *
 *  @file Dibujo de triangulos con semicírculos.
 *
 *  @version  01/04/2020 - Creación (primera versión) del código.
 */
'use strict';

const WIDTH_OF_CANVAS = 1920;
const HEIGHT_OF_CANVAS = 720;
const BLACK_COLOR = 'black';
const WHITE_COLOR = 'white';
const OFF_SET_ON_X = 300;
const START_OF_FIRST_TRIANGLE = WIDTH_OF_CANVAS / 4 + OFF_SET_ON_X / 2;
const END_OF_FIRST_TRIANGLE = WIDTH_OF_CANVAS * 0.75 - OFF_SET_ON_X;
const START_OF_SECOND_TRIANGLE = WIDTH_OF_CANVAS / 4 + OFF_SET_ON_X;
const END_OF_SECOND_TRIANGLE =  WIDTH_OF_CANVAS * 0.75 - OFF_SET_ON_X / 2;
const HIGH_HEIGHT = HEIGHT_OF_CANVAS * 0.9;
const MEDIUM_HEIGHT = HEIGHT_OF_CANVAS / 2;
const LOW_HEIGHT = HEIGHT_OF_CANVAS * 0.1;
const RADIUS_ARCS = 50;
const LINE_WIDTH = 10;



/**
 * @description - Dibuja triángulo a partir de 3 puntos, una anchura de línea
 * y colores
 * @param {ctx} ctx - Contexto sobre el que se dibuja.
 * @param {Triangle} triangle - Triangulo a dibujar.
 * @param {int} lineWidth - Anchura de las líneas del triángulo
 * @param {string} insideColor - Color del interior del triángulo
 * @param {string} colorLine - Color de la línea del triángulo.
 */
const drawTriangle = (ctx, triangle, lineWidth, insideColor, colorLine = WHITE_COLOR) => {
  ctx.beginPath();
  ctx.moveTo(triangle.x.x, triangle.x.y);
  ctx.lineTo(triangle.y.x, triangle.y.y);
  ctx.lineTo(triangle.z.x, triangle.z.y);
  ctx.closePath();
  // Dibujo del exterior del triángulo
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = colorLine;
  ctx.stroke();
  // Pintar el interior.
  ctx.fillStyle = insideColor;
  ctx.fill();
}

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

/**
 * @description Función principal del programa. En primer lugar pinta el conjunto
 * de Mandlebrot para los píxeles de la pantalla.
 */
const draw = () => {
  const canvas = document.getElementById('dibujoEjercicio01');
  canvas.width = WIDTH_OF_CANVAS;
  canvas.height = HEIGHT_OF_CANVAS;
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    const firstPointFirstTriangle = new Point(START_OF_FIRST_TRIANGLE, MEDIUM_HEIGHT);
    const secondPointFirstTriangle = new Point(END_OF_FIRST_TRIANGLE, HIGH_HEIGHT);
    const thirdPointFirstTriangle = new Point(END_OF_FIRST_TRIANGLE, LOW_HEIGHT);
    const firstTriangle = new Triangle(firstPointFirstTriangle, secondPointFirstTriangle, thirdPointFirstTriangle);
    const firstPointSecondTriangle = new Point(START_OF_SECOND_TRIANGLE, LOW_HEIGHT);
    const secondPointSecondTriangle = new Point(START_OF_SECOND_TRIANGLE, HIGH_HEIGHT);
    const thirdPointSecondTriangle = new Point(END_OF_SECOND_TRIANGLE, MEDIUM_HEIGHT);
    const secondTriangle = new Triangle(firstPointSecondTriangle, secondPointSecondTriangle, thirdPointSecondTriangle);
    
    drawTriangle(ctx, firstTriangle, LINE_WIDTH, WHITE_COLOR, BLACK_COLOR);
    drawArc(ctx, firstPointSecondTriangle, RADIUS_ARCS, BLACK_COLOR);
    drawArc(ctx, secondPointSecondTriangle, RADIUS_ARCS, BLACK_COLOR);
    drawArc(ctx, thirdPointSecondTriangle, RADIUS_ARCS, BLACK_COLOR);
    drawTriangle(ctx, secondTriangle, LINE_WIDTH, WHITE_COLOR);
  }
};