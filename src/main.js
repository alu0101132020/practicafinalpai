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

const start = () => {
  const screen = new BouncingScreenClass(document.getElementById('bounce'));
    screen.animation();
}
