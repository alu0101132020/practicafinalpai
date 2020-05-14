/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 13. Bouncing Ball. Programación Gráfica, Orientada a Objetos y dirigida por eventos en JS.
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 13/05/2020
 *  @desc Tests de la clase point
 *  References:
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P13-BouncingBall/blob/master/2019-2020_p13_BouncingBall.md
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/pai-p13-bouncing-ball-alu0101132020
 *
 *  @file Fichero que contiene los distintos test necesarios para probar el correcto
 *  funcionamiento de la clase point.
 *
 *  @version  13/05/2020 - Creación (primera versión) del código.
 */

'use strict';

let PointTest = null;
let expectTest = null;

if (typeof(window) === 'undefined') {
  PointTest = require('../src/point');
  const chai = require('chai');
  expectTest = chai.expect;
} else {
  PointTest = Point;
  expectTest = expect;
}

describe ('Point', () => {
  describe('getters', () => {
  let testPoint = new PointTest(3, 4);
    it ('should return 3 as x component of our point', () => {
      expectTest(testPoint.x).to.equal(3);
    });
    it ('should return 4 as y component of our point', () => {
      expectTest(testPoint.y).to.equal(4);
    });
  });
  describe('setters', () => {
    let testPoint = new PointTest(3, 4);
    testPoint.x = 5;
    testPoint.y = 3;
    it ('should return 5 as x component of our point after setting it', () => {
      expectTest(testPoint.x).to.equal(5);
    });
    it ('should return 3 as y component of our point after setting it', () => {
      expectTest(testPoint.y).to.equal(3);
    });
  });
});