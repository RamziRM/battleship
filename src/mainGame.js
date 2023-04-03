// import modules
import {player} from "./player";

// main game loop
export const game = function() {
    console.log("exmainGame function called");

    let human = player();
    let enemy = player();

    // playRound function
    // play round: recieve human choice, if square hit: true return, if not, human.attack, computer.randomAttack
    function playRound(humanChoice) {
        if (enemy.ownBoard.hasAttack(humanChoice))
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
    };

    // return functions
    return {
        playRound,
        getHuman,
        getEnemy,
        hasGameFinished,
        restartGame
    }
}();

