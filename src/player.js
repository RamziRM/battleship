const gameboard = require('./factories/gameboard');

function Player() {
    const ownBoard = gameboard();
    const enemyBoard = gameboard();

    function attack(x, y, enemyBoard) {
        return enemyBoard.receiveAttack(x, y);
    }
  
    function randomAttack(pToAttack) {
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      while (missedAttacks.has(`${x},${y}`)) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      }
      return [x, y];
    }

    // place ships randomly - within bounds and not overlapping using isValidPlacement function
    function placeShipsRandomly() {
        ownBoard.ships.forEach(ship => {
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);
            let isHorizontal = Math.random() < 0.5;
            while (!ownBoard.isValidPlacement(ship, x, y, isHorizontal)) {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
                isHorizontal = Math.random() < 0.5;
            }
            ownBoard.placeShip(ship, x, y, isHorizontal);
        });
    }


    return {
        ownBoard,
        enemyBoard,
        attack,
        randomAttack,
        placeShipsRandomly
    };

}

module.exports = Player;