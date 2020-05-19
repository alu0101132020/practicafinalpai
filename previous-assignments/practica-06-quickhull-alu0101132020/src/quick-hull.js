/* eslint-disable max-len */
/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 6. QuickHull. Gráficos en JS usando canvas.
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 21/03/2020
 *  @desc Implementación del código que implementa la malla convexa
 *  en JS usando Canvas
 *  References:
 *               Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P06-QuickHull/blob/master/2019-2020_p06_QuickHull.md *
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-05-json-data-alu0101132020
 *
 *  @file Programa principal
 *
 *  @version  21/03/2020 - Creación (primera versión) del código.
 */

'use strict';

const df = require('./drawing-functions.js');

const RED = 'red';
const BLUE = 'blue';
const GREEN = 'green';
const BLACK = 'black';
const RESULT_LINE_WIDTH = 2;
const NORMAL_LINE_WIDTH = 1;

/**
 * @description - Función que genera un punto aleatorio
 * @param {canvas} canvas - Canvas con el que trabajamos.
 * @return {point} - Punto aleatorio generado
 */
const generateRandomPoint = (canvas) => {
  return {x: Math.floor(Math.random() * canvas.width * 0.9), y: Math.floor(Math.random() * canvas.height * 0.84)};
};

/**
 * @description - Función que retorna todos los
 * puntosnecesarios mediante llamadas a una función que
 * genera los puntos.
 * @param  {int} amountOfPoints - Número de puntos que
 * se desean generar.
 * @param {canvas} canvas - Canvas con el que trabajamos.
 * @return {array} - Array que contiene todos los puntos
 * generados.
 */
const getArrayOfPoints = (amountOfPoints, canvas) => {
  const arrayOfPoints = [];
  for (let currentPoint = 0; currentPoint < amountOfPoints; currentPoint++) {
    arrayOfPoints.push(generateRandomPoint(canvas));
  }
  return arrayOfPoints;
};

/**
 * @description - Función que extrae de un conjunto de puntos
 * aquellos que tienen la mayor y menor x asociada.
 * @param {array} arrayOfPoints - Conjunto de puntos sobre
 * los que obtendremos los que tengan mayor y menor componente x
 * @return {array} - array solución de la función.
 */
const getMaxXAndMinXPoint = (arrayOfPoints) => {
  if (arrayOfPoints.length > 0) {
    let maxXPoint = {x: arrayOfPoints[0].x, y: arrayOfPoints[0].y};
    let minXPoint = {x: arrayOfPoints[0].x, y: arrayOfPoints[0].y};
    for (const currentPoint of arrayOfPoints) {
      if (currentPoint.x > maxXPoint.x) {
        maxXPoint = currentPoint;
      }
      if (currentPoint.x < minXPoint.x) {
        minXPoint = currentPoint;
      }
    }
    return [maxXPoint, minXPoint];
  }
};
/**
 * @description - Función que a partir de 2 puntos genera una recta
 * y con uno tercero calcula la distancia a este.
 * @param  {point} pointALine - Primer punto que define la recta
 * @param  {point} pointBLine - Segundo punto que definira la recta
 * @param  {point} calculatingPoint - Punto sobre el que calcularemos
 * la distancia.
 * @return {distance} - Distancia entre el punto de ejemplo y la recta.
 */
const distanceFromLine = (pointALine, pointBLine, calculatingPoint) => {
  const xComponent = pointALine.x - pointBLine.x;
  const yComponent = pointBLine.y - pointALine.y;
  return (xComponent * (calculatingPoint.y - pointALine.y) + yComponent * (calculatingPoint.x - pointALine.x));
};

/**
 * @description - Función que a partir de 2 puntos genera una
 * recta y se queda con los puntos que están "por encima" (esto
 * es relativo al plano cartesiano) y además también encuentra el
 * punto más lejano a la recta.
 * @param  {array} arrayOfPoints - Todos los puntos del conjunto actual
 * @param  {point} firstPoint - Primer punto que definirá la recta
 * @param  {point} secondPoint - Segundo punto que definirá la recta
 * @return {object} - Retorna el objeto que contiene el subconj.
 * de puntos y el punto más lejano.
 */
const obtainSubSetAndFurthestPoints = (arrayOfPoints, firstPoint, secondPoint) => {
  let furthestPoint = null;
  let furthestDistance = -1;
  const subset = [];
  for (const currentPoint of arrayOfPoints) {
    const currentPointDistance = distanceFromLine(firstPoint, secondPoint, currentPoint);
    if (currentPointDistance > 0) {
      subset.push(currentPoint);
    } else {
      continue;
    }
    if (currentPointDistance > furthestDistance) {
      furthestPoint = currentPoint;
      furthestDistance = currentPointDistance;
    }
  }
  return {subset, furthestPoint};
};



/**
 * @description - Algorimo quickhull que divide el problema en
 * dos subproblemas tras dividir el conjunto de puntos en dos
 * mitades. El caso base es cuando a partir de una recta genreada
 * no se puede obtener un punto más lejano (no hay 3 puntos o más)
 * @param  {array} arrayOfPoints - Array que contiene todos los
 * puntos del subconjunto
 * @param  {point} firstPoint - Primer punto de la recta
 * @param  {point} secondPoint - Segundo punto de la recta
 * @param {context} ctx - Contexto sobre el que dibujamos.
 */
const quickHull = (arrayOfPoints, firstPoint, secondPoint, ctx) => {
  df.drawLine(firstPoint, secondPoint, ctx, RED, NORMAL_LINE_WIDTH);
  setTimeout(() => {
    const subsetAndFurthestPoint = obtainSubSetAndFurthestPoints(arrayOfPoints, firstPoint, secondPoint);
    const furthestPoint = subsetAndFurthestPoint.furthestPoint;
    const subset = subsetAndFurthestPoint.subset;
    if (furthestPoint === null) {
      setTimeout(() => {
        df.drawPoint(firstPoint, ctx, GREEN);
        df.drawLine(firstPoint, secondPoint, ctx, BLUE, RESULT_LINE_WIDTH);
      }, 2000);
    } else {
      quickHull(subset, firstPoint, furthestPoint, ctx);
      quickHull(subset, furthestPoint, secondPoint, ctx);
    }
  }, 2000);
};

/**
 * @param {Array} arrayOfPoints - Conjunto de puntos sobre
 * el que formaremos la malla convexa
 * @param {context} ctx - Contexto sobre el que dibujamos.
 */
const convexHull = (arrayOfPoints, ctx) => {
  if (arrayOfPoints.length < 3) {
    console.log('error');
  } else {
    const maxAndMinX = getMaxXAndMinXPoint(arrayOfPoints);
    const maxX = maxAndMinX[0];
    const minX = maxAndMinX[1];
    quickHull(arrayOfPoints, minX, maxX, ctx);
    quickHull(arrayOfPoints, maxX, minX, ctx);
    console.log(arrayOfPoints.length);
    console.log(hull.length);
  }
};

/**
 * @description - Función que para cada punto llama a la función
 * que dibuja el punto.
 * @param {array} arrayOfPoints - Array de puntos aleatorios generados.
 * @param {context} ctx - Contexto sobre el que dibujamos.
 * @param {color} color - Color que se usa para diferenciar las distintas
 * partes
 */
const drawAllPoints = (arrayOfPoints, ctx, color) => {
  for (const currentPoint of arrayOfPoints) {
    df.drawPoint(currentPoint, ctx, color);
  }
};

const CANVAS = document.getElementById('quick-hull');
/**
 * @description - Función principal del programa.
 */

const draw = () => {
  CANVAS.width = window.innerWidth;
  CANVAS.height = window.innerHeight;
  if (CANVAS.getContext) {
    const numberOfPoints = prompt('Enter the number of points that the converx hull will be made of:', '0');
    if (numberOfPoints > 0) {
      const ctx = CANVAS.getContext('2d');
      ctx.translate(CANVAS.height * 0.08, CANVAS.width * 0.053);
      const arrayOfPoints = getArrayOfPoints(numberOfPoints, CANVAS);
      drawAllPoints(arrayOfPoints, ctx, BLACK);
      convexHull(arrayOfPoints, ctx);
    } else {
      console.log('error');
    }
  }
};

draw();