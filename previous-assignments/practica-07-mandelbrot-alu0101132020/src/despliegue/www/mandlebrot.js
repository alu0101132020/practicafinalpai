/* eslint-disable max-len */
/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 7. Mandelbrot. Gráficos en JS usando canvas.
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 28/03/2020
 *  @desc Implementación del código que muestra en html el conjunto de
 *  Mandlebrot para un número concreto de puntos y un umbral establecido
 *  References:
 *               Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P07-Mandelbrot/blob/master/2019-2020_p07_Mandelbrot.md
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-07-mandelbrot-alu0101132020
 *
 *  @file Programa principal
 *
 *  @version  28/03/2020 - Creación (primera versión) del código.
 */
'use strict';

const WIDTH_OF_CANVAS = 2125;
const HEIGHT_OF_CANVAS = 1000;
const X_LEFT_LIMIT = -2;
const X_RIGHT_LIMIT = 1;
const Y_LEFT_LIMIT = -1;
const Y_RIGHT_LIMIT = 1;
const X_LEFT_LIMIT_OF_COMPLEX = -2;
const X_RIGHT_LIMIT_OF_COMPLEX = 0.5;
const Y_LEFT_LIMIT_COMPLEX = 0;
const Y_RIGHT_LIMIT_COMPLEX = 1.125;
const FACTOR_ONE_OF_AREA = 2.5;
const FACTOR_TWO_OF_AREA = 2;
const MAX_ITERATIONS_PER_PIXEL = 80;
const MYFONT = '30px Arial';
const MYFONT_COLOR = 'white';
const STRINGS_X_AXIS = 200;
const NUMBEROFPOINTS_STRING_Y = 850;
const ERRORPOINTS_STRING_Y = 850;
const AREA_STRING_Y = 900;
const ERROR_STRING_Y = 950;
const VALOR_UMBRAL = 2;

/**
 * @description Función que genera un punto aleatorio en el rango de interés para
 * los números del conjunto de Mandlebrot.
 * @return {ComplexNumber} - Retorna un número complejo.
 */
const generateRandomPoint = () => {
  return new ComplexNumber(Math.random() * (X_RIGHT_LIMIT_OF_COMPLEX - X_LEFT_LIMIT_OF_COMPLEX) + X_LEFT_LIMIT_OF_COMPLEX,
     Math.random() * (Y_RIGHT_LIMIT_COMPLEX - Y_LEFT_LIMIT_COMPLEX) + Y_LEFT_LIMIT_COMPLEX);
};

/**
 * @description Función que obtiene el array de puntos y lo retorna.
 * @param {int} amountOfPoints - Número de puntos a generar
 * @return {arrayOfComplexNumbers} - Retorna los puntos del necesarios para
 * calcular
 */
const getArrayOfPoints = (amountOfPoints) => {
  const arrayOfPoints = [];
  for (let currentPoint = 0; currentPoint < amountOfPoints; currentPoint++) {
    arrayOfPoints.push(generateRandomPoint());
  }
  return arrayOfPoints;
};

/**
 * @description Función que indica si un punto pertenece o no al conjunto de Mandlebrot, y en caso
 * de no pertenecer, retorna el número de iteraciones al que se llegó antes de sobrepasar el umbral.
 * @param {ComplexNumber} point - Número que se comprueba si pertenece al conjunto de Mandlebrot
 * @return {true} - Retorna un booleano o un entero.
 */
const pointIsFromMandleBrotSet = (point) => {
  let currentIteration = 0;
  const NumberC = point;
  while (Math.sqrt(point.real * point.real + point.imaginary * point.imaginary) < VALOR_UMBRAL && currentIteration < MAX_ITERATIONS_PER_PIXEL) {
    point = point.multiplication(point);
    point = point.addition(NumberC);
    currentIteration++;
  } 
  if (Math.sqrt(point.real * point.real + point.imaginary * point.imaginary) < VALOR_UMBRAL){
    return true;
  }
  return currentIteration;
}

/**
 * @description Función que dibuja el conjunto de Mandlebrot usando la pantalla como
 * puntos para el conjunto. La coordenada x se corresponde con una cordenada real
 * de un número y la y con la parte imaginaria. Si un punto pertenece al conjunto
 * de Mandlebrot se pintará de negro, en otro caso lo pintará de otro color dependiendo
 * del número de iteraciones realizado.
 * @param {contexto} ctx 
 * @param {canvas} canvas 
 */
const drawMandlebrotSet = (ctx, canvas) => {
  const LIGHT_PARAMATER1 = 150;
  const LIGHT_PARAMATER2 = 15;
  const HUE_PARAMATER1 = 210;
  const HUE_PARAMATER2 = 150;
  for (let xComponentOfCurrentPixel = 0; xComponentOfCurrentPixel < canvas.width; xComponentOfCurrentPixel++) {
    for (let yComponentOfCurrentPixel = 0; yComponentOfCurrentPixel < canvas.height; yComponentOfCurrentPixel++) {
      let currentX = X_LEFT_LIMIT + (xComponentOfCurrentPixel / canvas.width) * (X_RIGHT_LIMIT - X_LEFT_LIMIT);
      let currentY = Y_LEFT_LIMIT + (yComponentOfCurrentPixel / canvas.height) * (Y_RIGHT_LIMIT - Y_LEFT_LIMIT);
      let numberZ = new ComplexNumber(currentX, currentY);
      const lightness = (pointIsFromMandleBrotSet(numberZ) === true ?  0 : pointIsFromMandleBrotSet(numberZ) / MAX_ITERATIONS_PER_PIXEL / LIGHT_PARAMATER1 + LIGHT_PARAMATER2);
      const hue = (HUE_PARAMATER1 + HUE_PARAMATER2 * pointIsFromMandleBrotSet(numberZ)) / MAX_ITERATIONS_PER_PIXEL;
      const hslColor = 'hsl(' + hue + ', 100%,' + lightness + '%)';
        ctx.fillStyle = hslColor;
        ctx.fillRect(xComponentOfCurrentPixel, yComponentOfCurrentPixel, 1, 1);
    }  
  }
}

/**
 * @description - Función que calcula el área del conjunto de Mandlebrot a partir de un
 * array de puntos verificando cuantos de estos están en el conjunto dividido entre el total
 * y además calcula el error. Al final imprime en el canvas estas soluciones.
 * @param {arrayOfPoints} numberOfPoints - Número de puntos que se utilzarán para calcular el área.
 * @param {ctx} ctx 
 */
const calculateMandlebrotSetArea = (numberOfPoints, ctx) => {
  const arrayOfPoints = getArrayOfPoints(numberOfPoints);
  let numberOfPointsOnMandlebrotSet = 0;
  for (const point of arrayOfPoints) {
    if (pointIsFromMandleBrotSet(point) === true){
      numberOfPointsOnMandlebrotSet++;
    }
  }
  const area = (FACTOR_TWO_OF_AREA * FACTOR_ONE_OF_AREA * Y_RIGHT_LIMIT_COMPLEX * (numberOfPointsOnMandlebrotSet / numberOfPoints)).toFixed(4);
  const error = (area / Math.sqrt(numberOfPoints)).toFixed(4);
  ctx.font = MYFONT;
  ctx.fillStyle = MYFONT_COLOR;
  ctx.fillText(`Solución para: ${numberOfPoints} puntos` , STRINGS_X_AXIS, NUMBEROFPOINTS_STRING_Y);
  ctx.fillText(`Area: ${area}` , STRINGS_X_AXIS, AREA_STRING_Y);
  ctx.fillText(`Error: ${error}`, STRINGS_X_AXIS, ERROR_STRING_Y);
}

/**
 * @description - Dibuja un error en pantalla en caso de que el número de puntos
 * haya sido incorrecto.
 * @param {ctx} ctx - Contexto sobre el que se dibuja.
 */
const showError = (ctx) => {
  ctx.font = MYFONT;
  ctx.fillStyle = MYFONT_COLOR;
  ctx.fillText(`El valor de puntos introducido es no válido.` , STRINGS_X_AXIS, ERRORPOINTS_STRING_Y);
}

/**
 * @description Función principal del programa. En primer lugar pinta el conjunto
 * de Mandlebrot para los píxeles de la pantalla.
 */
const mandlebrot = () => {
  const canvas = document.getElementById('mandlebrot');
  canvas.width = WIDTH_OF_CANVAS;
  canvas.height = HEIGHT_OF_CANVAS;
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    drawMandlebrotSet(ctx, canvas);
    const numberOfPoints = prompt('Enter the number of points that will be used to estimate the area of the Mandlebrot set:', '0');
    if(numberOfPoints > 0 && !isNaN(numberOfPoints)) {
      calculateMandlebrotSetArea(numberOfPoints, ctx);
    } else {
      showError(ctx);
    }
  }
};
