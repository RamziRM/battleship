// import modules
const player = require('./player.js');

// main game loop
// 1. create players
function mainGame() {
    let human = player();
    let enemy = player();
    let turn = 0;

    // playRound function
    // play round: recieve human choice, if square hit: true return, if not, human.attack, computer.randomAttack
    function playRound(humanChoice) {
        // check if gameOver is true
        if (human.ownBoard.allSunk() || enemy.enemyBoard.allSunk()) {
            return;
        }
        if (enemy.enemyBoard.isHit(humanChoice))
            return;
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

    // restart game
    function restartGame() {
        human.ownBoard.resetBoard();
        enemy.enemyBoard.resetBoard();
        turn = 0;
    };

    // return functions
    return {
        playRound,
        getHuman,
        getEnemy,
        restartGame
    }
}

module.exports = mainGame;

