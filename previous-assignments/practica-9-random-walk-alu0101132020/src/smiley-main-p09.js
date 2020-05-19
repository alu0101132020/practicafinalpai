/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 9. Random Walk. Programación Gráfica y Orientada a Objetos en JS
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 19/04/2020
 *  @desc Main del smiley
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P09-RandomWalk/blob/master/2019-2020_p09_RandomWalk.md
 *              Descripción del camino aleatorio.
 *              https://en.wikipedia.org/wiki/Random_walk
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-9-random-walk-alu0101132020
 *
 *  @file Fichero que contiene la implementación del dibujo smiley
 *
 *  @version  22/04/2020 - Creación (primera versión) del código.
 */

'use strict';

const WIDTH_OF_CANVAS = 1920;
const HEIGHT_OF_CANVAS = 720;

const draw = () => {
  const canvas = document.getElementById('smileyFace');
  canvas.width = WIDTH_OF_CANVAS;
  canvas.height = HEIGHT_OF_CANVAS;
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    const centerOfCanvasPoint = new Point(WIDTH_OF_CANVAS / 2, HEIGHT_OF_CANVAS / 2);
    const smiley = new Smiley(centerOfCanvasPoint, 300, ctx);
    smiley.draw()
  }
}