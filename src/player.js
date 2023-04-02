const gameboard = require('./factories/gameboard');

function Player() {
    const ownBoard = gameboard();

    function attack(coords, pToAttack) {
        pToAttack.ownBoard.receiveAttack(coords);
    }

  
    function randomAttack(pToAttack) {
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      while (pToAttack.ownBoard.hasAttack([y, x]));
      pToAttack.ownBoard.receiveAttack([y, x]);
    }

    // place ships randomly 
    function placeShipsRandomly() {
        let length = 5;
        let isHorizontal;
        while (ownBoard.shipCount() != 5) {
            isHorizontal = Math.random() < 0.5; 
            ownBoard.placeShip(findLegalCord(length, isHorizontal), length, isHorizontal);
            if (length == 3) {
                isHorizontal = Math.random() < 0.5;
                ownBoard.placeShip(findLegalCord(length, isHorizontal), length, isHorizontal);
            }
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
        ownBoard,
        attack,
        randomAttack,
        placeShipsRandomly,
        findLegalCord
    };

}

module.exports = Player;