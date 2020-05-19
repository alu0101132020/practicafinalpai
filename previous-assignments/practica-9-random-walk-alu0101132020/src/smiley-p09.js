/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 9. Random Walk. Programación Gráfica y Orientada a Objetos en JS
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 19/04/2020
 *  @desc Clase smiley
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P09-RandomWalk/blob/master/2019-2020_p09_RandomWalk.md
 *              Descripción del camino aleatorio.
 *              https://en.wikipedia.org/wiki/Random_walk
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-9-random-walk-alu0101132020
 *
 *  @file Fichero que contiene la implementación de la clase smiley
 *
 *  @version  22/04/2020 - Creación (primera versión) del código.
 */

'use strict';

class Smiley {
  constructor(centerPoint, radiusFace, ctx) {
    this._ctx = ctx;
    const OFF_SET_FROM_CENTER = radiusFace / 3;
    const OFF_SET_FOR_EYE_BROWS = OFF_SET_FROM_CENTER * 0.5;
    const EYE_RADIUS = radiusFace * 0.05;
    this._leftEye = new Circle(new Point(centerPoint.x - OFF_SET_FROM_CENTER, centerPoint.y - OFF_SET_FROM_CENTER), EYE_RADIUS);
    this._rightEye = new Circle(new Point(centerPoint.x + OFF_SET_FROM_CENTER, centerPoint.y - OFF_SET_FROM_CENTER), EYE_RADIUS);
    this._leftEyeBrow = new Rectangle(
      new Point(centerPoint.x - OFF_SET_FROM_CENTER, centerPoint.y - OFF_SET_FROM_CENTER - OFF_SET_FOR_EYE_BROWS), EYE_RADIUS * 6, EYE_RADIUS);
    this._rightEyeBrow = new Rectangle(
      new Point(centerPoint.x + OFF_SET_FROM_CENTER, centerPoint.y - OFF_SET_FROM_CENTER - OFF_SET_FOR_EYE_BROWS), EYE_RADIUS * 6, EYE_RADIUS);
    this._mouth = 0;
    this._face = new Circle(centerPoint, radiusFace);
  }

  draw() {
    this._leftEye.drawShape(this._ctx);
    this._rightEye.drawShape(this._ctx);
    this._leftEyeBrow.drawShape(this._ctx);
    this._rightEyeBrow.drawShape(this._ctx);
    this._face.drawShapeNoFill(this._ctx);
  }
}