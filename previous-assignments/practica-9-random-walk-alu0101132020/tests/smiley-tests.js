/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 9. Random Walk. Programación Gráfica y Orientada a Objetos en JS
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 19/04/2020
 *  @desc Tests de smiley
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P09-RandomWalk/blob/master/2019-2020_p09_RandomWalk.md
 *              Descripción del camino aleatorio.
 *              https://en.wikipedia.org/wiki/Random_walk
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-9-random-walk-alu0101132020
 *
 *  @file Fichero de tests del ejercicio smiley
 *
 *  @version  22/04/2020 - Creación (primera versión) del código.
 */

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