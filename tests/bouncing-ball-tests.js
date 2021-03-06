/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 13. Bouncing Ball. Programación Gráfica, Orientada a Objetos y dirigida por eventos en JS.
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 13/05/2020
 *  @desc Tests de la clases que se usan en la implementación de Bouncing ball.
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

let BallTest = null;
let BouncingScreenTest = null;
let expectTest2 = null;

if (typeof(window) === 'undefined') {
  const chai = require('chai');
  expectTest2 = chai.expect;
  BallTest = require('../src/ball');
  BouncingScreenTest = require('../src/bouncing-screen');
} else {
  expectTest2 = expect;
  BallTest = Ball;
  BouncingScreenTest = BouncingScreen;
}

describe ('Ball', () => {
  describe('getters', () => {
  let testBall = new BallTest
    it ('should return 0 as x component of our ball', () => {
      expectTest2(testBall.position.x).to.equal(0);
    });
    it ('should return 0 as y component of our ball', () => {
      expectTest2(testBall.position.y).to.equal(0);
    });
    it ('should return 1 as radius of our ball', () => {
      expectTest2(testBall.radius).to.equal(1);
    });
    it ('should return black as color of our ball', () => {
      expectTest2(testBall.color).to.equal('black');
    });
  });
  describe('update position', () => {
    it ('should previous val of x should be different than new one.', () => {
      let testBall = new BallTest
      const previousXPos = testBall.position.x;
      testBall.updatePosition();
      expectTest2(previousXPos).to.not.equal(testBall.position.x);
    });
  });
});

describe ('BouncingScreen', () => {
  describe('getters', () => {
  let canvas = {height : 0, width : 0}
  canvas.height = 400;
  canvas.width = 300;
  let myScreen = new BouncingScreenTest(canvas);
    it ('should return 300 as maxX of screen', () => {
      expectTest2(myScreen.maxX).to.equal(300);
    });
    it ('should return 400 as maxY of screen', () => {
      expectTest2(myScreen.maxY).to.equal(400);
    });
  });
  describe('next frame', () => {
    let canvas = {height : 0, width : 0}
    canvas.height = 400;
    canvas.width = 300;
    let myScreen = new BouncingScreenTest(canvas);
    myScreen.ball.position.x = 250;
    myScreen.ball.position.y = 200;
    myScreen.nextFrame();
    it ('ball change 250 as new position on x to another', () => {
      expectTest2(myScreen.ball.position.x).to.not.equal(250);
    })
  })
});