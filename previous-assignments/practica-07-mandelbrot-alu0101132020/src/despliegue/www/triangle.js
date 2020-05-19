/* eslint-disable max-len */
/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 7. Mandelbrot. Gráficos en JS usando canvas.
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 28/03/2020
 *  @desc Implementación de la clase triangulo
 *  References:
 *               Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P07-Mandelbrot/blob/master/2019-2020_p07_Mandelbrot.md
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-07-mandelbrot-alu0101132020
 *
 *  @file Clase triangulo
 *
 *  @version  28/03/2020 - Creación (primera versión) del código.
 */

class Triangle {
  /**
   * @description Constructor que recibe tres puntos y con ello
   * conforma un triángulo
   * @param {Point} firstPoint - Primer punto que forma el triángulo
   * @param {Point} secondPoint - Segundo punto que forma el triángulo
   * @param {Point} thirdPoint - Tercer punto que forma el triángulo.
   */
  constructor (firstPoint, secondPoint, thirdPoint) {
    this.x = firstPoint;
    this.y = secondPoint;
    this.z = thirdPoint;
  }
};