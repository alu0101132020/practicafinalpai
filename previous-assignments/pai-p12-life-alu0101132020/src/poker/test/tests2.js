/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 8. Poker. OOP
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 09/04/2020
 *  @desc Implementación del código que realizará las pruebas unitarias del código.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P08-Poker/blob/master/2019-2020_p08_Poker.md
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-8-poker-alu0101132020
 *
 *  @file Fichero de tests unitarios del código.
 *
 *  @version  09/04/2020 - Creación (primera versión) del código.
 */

'use strict';


describe('Point', () => {
  const myTestPoint = new Point (3, 8);
  it ('should have 3 as x', () => {
    expect(myTestPoint.x).to.equal(3);
  });
  it ('should have 8 as y', () => {
    expect(myTestPoint.y).to.equal(8);
  });
  const myNegativePoint = new Point(-1, -1);
  it ('should have -1 as x', () => {
    expect(myNegativePoint.x).to.equal(-1);
  });
  it ('should have -1 as y', () => {
    expect(myNegativePoint.y).to.equal(-1);
  });
});

describe('Shape', () => {
  const myTestPoint = new Point (3, 8);
  const myShape = new Shape(myTestPoint);
  it ('should have 3 as x on center', () => {
    expect(myShape.center.x).to.equal(3);
  });
  it ('should have 8 as y on center', () => {
    expect(myShape.center.y).to.equal(8);
  });
})

describe('Circle', () => {
  const myTestPoint = new Point (3, 8);
  const myCircle = new Circle(myTestPoint, 30);
  it ('should have 3 as x on center', () => {
    expect(myCircle.center.x).to.equal(3);
  });
  it ('should have 8 as y on center', () => {
    expect(myCircle.center.y).to.equal(8);
  });
  it ('should have 30 as radius', () => {
    expect(myCircle._radius).to.equal(30);
  });
});

describe('Square', () => {
  const myTestPoint = new Point (3, 8);
  const mySquare= new Square(myTestPoint, 5);
  it ('should have 3 as x on center', () => {
    expect(mySquare.center.x).to.equal(3);
  });
  it ('should have 8 as y on center', () => {
    expect(mySquare.center.y).to.equal(8);
  });
  it ('should have 5 as side', () => {
    expect(mySquare._side).to.equal(5);
  });
})