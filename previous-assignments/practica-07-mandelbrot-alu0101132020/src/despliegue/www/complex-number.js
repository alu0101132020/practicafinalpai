/* eslint-disable max-len */
/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 7. Mandelbrot. Gráficos en JS usando canvas.
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 28/03/2020
 *  @desc Implementación del código que implementa la clase números complejos.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P07-Mandelbrot/blob/master/2019-2020_p07_Mandelbrot.md
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-07-mandelbrot-alu0101132020
 *
 *  @file Fichero que contiene la implementación de la clase complex number.
 *
 *  @version  28/03/2020 - Creación (primera versión) del código.
 */
'use strict';

class ComplexNumber {
  /**
   * @description Constructor que recibe un dos enteros y los 
   * separa para formar nuestro número imaginario
   * @param {int} real - número que pertence al conjunto de los
   * reales
   * @param {int} imaginary - número qeu pertenece al conjunto
   * de los imaginarios.
   */
  constructor (real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

  /**
   * @description Función que retorna el módulo de dos números imaginarios.
   * @return Retorna el módulo del número imaginario.
   */
  module() {
    return Math.sqrt(this.real * this.real + this.imaginary * this.imaginary);
  }

  /**
   * @description Función que multiplica dos números imaginarios y retorna uno nuevo.
   * @param {ComplexNumber} otherNumber - Segundo número imaginario recibido por
   * parámetro.
   * @return Retorna el númer imaginario resultado
   */
  multiplication(otherNumber) {
    const auxiliarReal = this.real * otherNumber.real - this.imaginary * otherNumber.imaginary;
    const auxiliarImaginary = this.real * otherNumber.imaginary + this.imaginary * otherNumber.real;
    return new ComplexNumber(auxiliarReal, auxiliarImaginary);
  }

  /**
   * @description Función que suma dos números imaginarios y retorna uno nuevo.
   * @param {ComplexNumber} otherNumber - Segundo número imaginario recibido por
   * parámetro.
   * @return Retorna el númer imaginario resultado
   */
  addition(otherNumber) {
    const auxiliarReal = this.real + otherNumber.real;
    const auxiliarImaginary = this.imaginary + otherNumber.imaginary;
    return new ComplexNumber(auxiliarReal, auxiliarImaginary);
  }
};