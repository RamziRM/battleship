"use strict";

// import ship factory function
var Ship = require('../factories/ship');
beforeEach(function () {
  testShip = Ship(4);
});

// Ship factory function tests

// test if ship registers hits - adding a hit increases the number of hits
test('Ship can register 1 hit', function () {
  testShip.hit();
  expect(testShip.getHits()).toBe(1);
});
test('register 3 hits to testShip', function () {
  testShip.hit();
  testShip.hit();
  testShip.hit();
  expect(testShip.getHits()).toBe(3);
});
test('Can testShip sink -- update isSunk property', function () {
  for (var i = 0; i < 4; i++) {
    testShip.hit();
  }
  expect(testShip.isSunk()).toBe(true);
});