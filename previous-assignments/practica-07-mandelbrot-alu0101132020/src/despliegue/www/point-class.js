/* eslint-disable max-len */
/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 7. Mandelbrot. Gráficos en JS usando canvas.
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 28/03/2020
 *  @desc Implementación de la clase punto.
 *  References:
 *               Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P07-Mandelbrot/blob/master/2019-2020_p07_Mandelbrot.md
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-07-mandelbrot-alu0101132020
 *
 *  @file Clase punto
 *
 *  @version  28/03/2020 - Creación (primera versión) del código.
 */

class Point {
  /**
   * @description Constructor que recibe dos coordenadas para
   * crear un punto.
   * @param {int} x - Primera componente del punto
   * @param {int} y - Segunda componente del punto
   */
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
};