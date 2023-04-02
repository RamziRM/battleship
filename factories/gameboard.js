"use strict";

var Ship = require('./ship');

// Gameboard factory function
function Gameboard() {
  var board = [];
  var ships = [];

  // Create 10x10 board - 2D array
  // each cell is an object with hit and ship properties
  // inner array is a row, outer array is a column
  for (var x = 0; x < 10; x++) {
    var row = [];
    for (var y = 0; y < 10; y++) {
      row.push({
        hit: false,
        containsShip: -1
      });
    }
    board.push(row);
  }

  // startArr = [y, x] - array of coordinates
  // startArr[0] = y - (row) -- startArr[1] = x - (col)
  function placeShip(startArr, length, isHorizontal) {
    // new Ship object with length
    var shipToPlace = Ship(length);
    // push to empty ships array
    ships.push(shipToPlace);
    if (isHorizontal) {
      for (var i = startArr[1]; i < startArr[1] + length; ++i) {
        board[startArr[0]][i].containsShip = ships.length - 1;
      }
    } else {
      for (var _i = startArr[0]; _i < startArr[0] + length; ++_i) {
        board[_i][startArr[1]].containsShip = ships.length - 1;
      }
    }
  }

  // Receive attack
  // coords = [y, x]
  function receiveAttack(coords) {
    board[coords[0]][coords[1]].hit = true;
    if (board[coords[0]][coords[1]].containsShip != -1) {
      ships[board[coords[0]][coords[1]].containsShip].hit();
    }
  }
  function hasAttack(coords) {
    return board[coords[0]][coords[1]].hit;
  }
  function hasShip(coords) {
    return board[coords[0]][coords[1]].containsShip;
  }
  function getBoard() {
    return board;
  }

  // ** returns true if out of bounds
  function isOutOfBounds(startArr, length, isHorizontal) {
    if (isHorizontal) {
      return startArr[1] + length > 10;
    } else {
      return startArr[0] + length > 10;
    }
  }

  // ** returns true if ship overlaps
  function willOverlap(startArr, length, isHorizontal) {
    if (isHorizontal) {
      for (var i = startArr[1]; i < startArr[1] + length; ++i) {
        if (board[startArr[0]][i].containsShip != -1) {
          return true;
        }
      }
    } else {
      for (var _i2 = startArr[0]; _i2 < startArr[0] + length; ++_i2) {
        if (board[_i2][startArr[1]].containsShip != -1) {
          return true;
        }
      }
    }
    return false;
  }

  // Check if all ships are sunk - isSunk() is a method of Ship factory f()
  function allSunk() {
    return ships.every(function (ship) {
      return ship.isSunk();
    });
  }
  function shipCount() {
    return ships.length;
  }

  // reset board
  function resetBoard() {
    for (var _x = 0; _x < 10; _x++) {
      for (var _y = 0; _y < 10; _y++) {
        board[_y][_x].hit = false;
        board[_y][_x].containsShip = -1;
      }
    }
    ships.length = 0;
  }
  return {
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    hasAttack: hasAttack,
    hasShip: hasShip,
    getBoard: getBoard,
    isOutOfBounds: isOutOfBounds,
    willOverlap: willOverlap,
    allSunk: allSunk,
    shipCount: shipCount,
    resetBoard: resetBoard
  };
}
module.exports = Gameboard;