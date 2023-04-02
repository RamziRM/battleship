"use strict";

var gameboard = require('./factories/gameboard');
function player() {
  var ownBoard = gameboard();
  function attack(coords, pToAttack) {
    pToAttack.ownBoard.receiveAttack(coords);
  }
  function randomAttack(pToAttack) {
    var x = Math.floor(Math.random() * 10);
    var y = Math.floor(Math.random() * 10);
    while (pToAttack.ownBoard.hasAttack([y, x]));
    pToAttack.ownBoard.receiveAttack([y, x]);
  }

  // place ships randomly 
  function placeShipsRandomly() {
    var length = 5;
    var isHorizontal;
    while (ownBoard.shipCount() != 5) {
      isHorizontal = Math.random() < 0.5;
      ownBoard.placeShip(findLegalCord(length, isHorizontal), length, isHorizontal);
      // to create 2nd ship of 3 length
      if (length == 3) {
        isHorizontal = Math.random() < 0.5;
        ownBoard.placeShip(findLegalCord(length, isHorizontal), length, isHorizontal);
      }
      // decrease l per loop iteration - (max 5 ships)
      length--;
    }
  }

  // find a placeable cord for a ship
  function findLegalCord(length, isHorizontal) {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
    while (ownBoard.isOutOfBounds([y, x], length, isHorizontal) || ownBoard.willOverlap([y, x], length, isHorizontal));
    return [y, x];
  }
  return {
    ownBoard: ownBoard,
    attack: attack,
    randomAttack: randomAttack,
    placeShipsRandomly: placeShipsRandomly,
    findLegalCord: findLegalCord
  };
}
module.exports = player;