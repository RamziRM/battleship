// import modules
const player = require('./player.js');

// main game loop
// 1. create players
export const game = function() {
    console.log("exmainGame function called");

    let human = player();
    let enemy = player();

    // playRound function
    // play round: recieve human choice, if square hit: true return, if not, human.attack, computer.randomAttack
    function playRound(humanChoice) {
        // check if gameOver is true
        if (human.ownBoard.allSunk() || enemy.ownBoard.allSunk()) {
            return;
        }
        if (enemy.ownBoard.isHit(humanChoice))
            return;
        human.attack(humanChoice, enemy);
        enemy.randomAttack(human);
    }

    // get human and get enemy
    const getHuman = () => {
        return human;
    }

    const getEnemy = () => {
        return enemy;
    }

    function hasGameFinished() {
        return human.ownBoard.allSunk() || enemy.ownBoard.allSunk();
    }

    // restart game
    function restartGame() {
        human.ownBoard.resetBoard();
        enemy.ownBoard.resetBoard();
        turn = 0;
    };

    // return functions
    return {
        playRound,
        getHuman,
        getEnemy,
        hasGameFinished,
        restartGame
    }
}

