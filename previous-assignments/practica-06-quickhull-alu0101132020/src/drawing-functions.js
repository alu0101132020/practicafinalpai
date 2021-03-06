/* eslint-disable max-len */
/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 6. QuickHull. Gráficos en JS usando canvas.
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 24/03/2020
 *  @desc Modulo que contiene las funciones que dibujan.
 *  References:
 *               Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P06-QuickHull/blob/master/2019-2020_p06_QuickHull.md *
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-05-json-data-alu0101132020
 *
 *  @file Funciones de dibujo
 *
 *  @version  24/03/2020 - Creación (primera versión) del código.
 */

/**
 * @description - Función que pinta una línea.
 * @param {point} firstPoint - Segundo punto de la recta
 * @param {point} secondPoint Primer punto de la recta
 * @param {context} ctx - Contexto sobre el que dibujamos.
 * @param {color} color - Color que se usa para diferenciar las distintas
 * partes.
 * @param {int} width - Ancho de la línea a trazar
 */
const drawLine = (firstPoint, secondPoint, ctx, color = BLACK, width = NORMAL_LINE_WIDTH) => {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.moveTo(firstPoint.x, firstPoint.y);
  ctx.closePath();
  ctx.lineTo(secondPoint.x, secondPoint.y);
  ctx.stroke();
};

module.exports.drawLine = drawLine;

/**
 * @description - Función que dibuja un punto en el canvas.
 * @param {point} point - Punto a dibujar
 * @param {context} ctx - Contexto sobre el que dibujamos.
 * @param {color} color - Color que se usa para diferenciar las distintas
 * partes
 */
const drawPoint = (point, ctx, color = BLACK) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
};

module.exports.drawPoint = drawPoint;
