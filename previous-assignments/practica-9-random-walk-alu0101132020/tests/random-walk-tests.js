/**
 *  Escuela Superior de Ingeniería y Tecnología
 *  Grado en Ingeniería Informática
 *  Asignatura: Programación de Aplicaciones Interactivas
 *  Curso: 3º
 *  Práctica 9. Random Walk. Programación Gráfica y Orientada a Objetos en JS
 *  @author Manuel Andrés Carrera Galafate <alu0101132020@ull.edu.es>
 *  @since 19/04/2020
 *  @desc Tests de random-walk.
 *  References:
 *              Enunciado de la práctica:
 *              https://github.com/fsande/PAI-P09-RandomWalk/blob/master/2019-2020_p09_RandomWalk.md
 *              Descripción del camino aleatorio.
 *              https://en.wikipedia.org/wiki/Random_walk
 *  Repositorio git con este (y otros) códigos:
 *              https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-9-random-walk-alu0101132020
 *
 *  @file Fichero que contiene los distintos test necesarios para comprobar
 *  la funcionalidad de las distintas clases usadas para la implementación
 *  del random walker.
 *
 *  @version  19/04/2020 - Creación (primera versión) del código.
 */

let PointTest = null;
let LineTest = null;
let GridTest = null;
let DrawableTest = null;
let DrawablePointTest = null;
let DrawableLineTest = null;
let DrawableGridTest = null;
let expectTest = null;

if (typeof(window) === 'undefined') {
  PointTest = require('../src/point');
  LineTest = require('../src/line');
  GridTest = require('../src/grid');
  DrawableTest = require('../src/drawable-elements').Drawable;
  DrawablePointTest = require('../src/drawable-elements').DrawablePoint;
  DrawableLineTest = require('../src/drawable-elements').DrawableLine
  DrawableGridTest = require('../src/drawable-elements').DrawableGrid;
  const chai = require('chai');
  expectTest = chai.expect;
} else {
  PointTest = Point;
  LineTest = Line;
  GridTest = Grid;
  DrawableTest = Drawable;
  DrawablePointTest = DrawablePoint;
  DrawableLineTest = DrawableLine;
  DrawableGridTest = DrawableGrid;
  expectTest = expect;
}

'use strict';

describe ('Point', () => {
  describe('getters', () => {
  let testPoint = new PointTest(3, 4, 8, 7);
    it ('should return 3 as x component of our point', () => {
      expectTest(testPoint.x).to.equal(3);
    });
    it ('should return 4 as y component of our point', () => {
      expectTest(testPoint.y).to.equal(4);
    });
  it ('should return 8 as x relative position of our point', () => {
    expectTest(testPoint.positionX).to.equal(8);
  });
  it ('should return 4 as y relative position of our point', () => {
    expectTest(testPoint.positionY).to.equal(7);
  });
});
  describe('setters', () => {
    let testPoint = new PointTest(3, 4, 8, 7);
    testPoint.x = 5;
    testPoint.y = 3;
    testPoint.positionX = 2;
    testPoint.positionY = 1;
    it ('should return 5 as x component of our point after setting it', () => {
      expectTest(testPoint.x).to.equal(5);
    });
    it ('should return 3 as y component of our point after setting it', () => {
      expectTest(testPoint.y).to.equal(3);
    });
    it ('should return 5 as x relative position of our point after setting it', () => {
      expectTest(testPoint.positionX).to.equal(2);
    });
    it ('should return 3 as y relative position of our point after setting it', () => {
      expectTest(testPoint.positionY).to.equal(1);
    });
  });
});

describe ('Line', () => {
  describe ('default line. should have as points by default 2 with componentes 0,0', () => {
    const testLine = new LineTest;
    it ('first point x to equal 0', () => {
      expectTest(testLine.firstPoint.x).to.equal(0);
    });
    it ('first point y to equal 0', () => {
      expectTest(testLine.firstPoint.y).to.equal(0);
    });
    it ('second point x to equal 0', () => {
      expectTest(testLine.secondPoint.x).to.equal(0);
    });
    it ('second point y to equal 0', () => {
      expectTest(testLine.secondPoint.y).to.equal(0);
    });
  });
  describe ('line with points 3,4 and 8,7 as components', () => {
    const testPoint1 = new PointTest(3,4);
    const testPoint2 = new PointTest(8,7);
    const testLine = new LineTest(testPoint1, testPoint2);
    it ('first point x to equal 3', () => {
      expectTest(testLine.firstPoint.x).to.equal(3);
    });
    it ('first point y to equal 4', () => {
      expectTest(testLine.firstPoint.y).to.equal(4);
    });
    it ('second point x to equal 8', () => {
      expectTest(testLine.secondPoint.x).to.equal(8);
    });
    it ('second point y to equal 7', () => {
      expectTest(testLine.secondPoint.y).to.equal(7);
    });
  });
});

describe ('Grid', () => {
  describe ('default grid', () => {
    const testGrid = new GridTest;
    it ('number of columns should be 1', () => {
      expectTest(testGrid.numberOfColumns).to.equal(1);
    });
    it ('number of rows should be 1', () => {
      expectTest(testGrid.numberOfRows).to.equal(1);
    });
    it ('distance between lines should be 100 pixels', () => {
      expectTest(testGrid.distanceBetweenLines).to.equal(100);
    });
  });
});

describe ('Drawable', () => {
  it ('ctx should not be null', () => {
    const drawable = new DrawableTest(8);
    expectTest(drawable._ctx).to.equal(8);
  });
});

describe ('DrawablePoint', () => {
  const testPoint1 = new PointTest(3,4);
  const drawablePoint = new DrawablePointTest(testPoint1, 8);
  describe ('Point should be returned properly', () => {
    it ('should return 3 as x component of our point', () => {
      expectTest(drawablePoint.point.x).to.equal(3);
    });
    it ('should return 4 as y component of our point', () => {
      expectTest(drawablePoint.point.y).to.equal(4);
    });
  });
  describe ('Point properties for drawing', () => {
    drawablePoint.pointWidth = 3;
    drawablePoint.pointColor = 'red';
    it ('point width should be 3', () => {
      expectTest(drawablePoint._pointWidth).to.equal(3);
    });
    it ('point color should be red', () => {
      expectTest(drawablePoint._pointColor).to.equal('red');
    });
  })
});

describe ('DrawableLine', () => {
  const testPoint1 = new PointTest(3,4);
  const testPoint2 = new PointTest(3, 8);
  const drawableLine = new DrawableLineTest(new LineTest(testPoint1, testPoint2), 8);
  describe ('Point should be returned properly', () => {
    it ('should return 3 as x component of our first point on line', () => {
      expectTest(drawableLine.line.firstPoint.x).to.equal(3);
    });
  });
  describe ('Line properties for drawing', () => {
    drawableLine.edgeWidth = 3;
    drawableLine.strokeColor = 'red';
    it ('line edge width should be 3', () => {
      expectTest(drawableLine._edgeWidth).to.equal(3);
    });
    it ('line color should be red', () => {
      expectTest(drawableLine._strokeColor).to.equal('red');
    });
  })
});

describe ('DrawableGrid', () => {
  const myGrid = new GridTest(30, 30, 20);
  const myDrawableGrid = new DrawableGridTest(myGrid, 8);
  describe ('Grid should be returned properly', () => {
    it ('should return 30 as number of Rows of the grid.', () => {
      expectTest(myDrawableGrid.grid.numberOfRows).to.equal(30);
    });
  });
});