"use strict";

var Player = require('../player');
var Gameboard = require('../factories/gameboard');
var testPlayer;
var enemyPlayer;
beforeEach(function () {
  testPlayer = Player();
  enemyPlayer = Player();
});

// test if player can recieve attack
test('player can recieve attack', function () {
  testPlayer.ownBoard.placeShip([3, 4], 2, true);
  enemyPlayer.attack([3, 4], testPlayer);
  expect(testPlayer.ownBoard.hasAttack([3, 4])).toBe(true);
});

// test if can make random attack - loop through board and check if any of the squares have been attacked - expect 1 hit only
test('player can make random attack', function () {
  enemyPlayer.randomAttack(testPlayer);
  var hasAttack = 0;
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      if (testPlayer.ownBoard.hasAttack([i, j])) {
        hasAttack++;
      }
    }
  }
  expect(hasAttack).toBe(1);
});