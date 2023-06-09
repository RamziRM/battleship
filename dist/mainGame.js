"use strict";

// import modules
var player = require('./player.js');

// main game loop
// 1. create players
function mainGame() {
  console.log("mainGame function called");
  var human = player();
  var enemy = player();

  // playRound function
  // play round: recieve human choice, if square hit: true return, if not, human.attack, computer.randomAttack
  function playRound(humanChoice) {
    // check if gameOver is true
    if (human.ownBoard.allSunk() || enemy.enemyBoard.allSunk()) {
      return;
    }
    if (enemy.enemyBoard.isHit(humanChoice)) return;
    human.attack(humanChoice, enemy);
    enemy.randomAttack(human);
  }

  // get human and get enemy
  function getHuman() {
    return human;
  }
  function getEnemy() {
    return enemy;
  }
  function hasGameFinished() {
    return human.ownBoard.allSunk() || enemy.enemyBoard.allSunk();
  }

  // restart game
  function restartGame() {
    human.ownBoard.resetBoard();
    enemy.enemyBoard.resetBoard();
    turn = 0;
  }
  ;

  // return functions
  return {
    playRound: playRound,
    getHuman: getHuman,
    getEnemy: getEnemy,
    hasGameFinished: hasGameFinished,
    restartGame: restartGame
  };
}
module.exports = mainGame;