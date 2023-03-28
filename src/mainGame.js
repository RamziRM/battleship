// import modules
const player = require('./player.js');

// main game loop
// 1. create players
function mainGame() {
    let human = player();
    let computer = player();
    let turn = 0;

    // playRound function
    // play round: recieve human choice, if square hit: true return, if not, human.attack, computer.randomAttack
    function playRound(humanChoice) {
        let [x, y] = humanChoice;
        let humanHit = human.attack(x, y, computer.enemyBoard);
        if (!humanHit) {
            let [x, y] = computer.randomAttack(human.ownBoard);
            computer.attack(x, y, human.enemyBoard);
        }

        // check if game is over
        if (human.ownBoard.allSunk()) {
            return 'Computer wins!';
        }
        if (computer.ownBoard.allSunk()) {
            return 'Human wins!';
        }
        return 'Continue';
    }

}
