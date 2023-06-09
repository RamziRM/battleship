import { gameboard } from "./gameboard";

export const player = function() {
    const ownBoard = gameboard();

    function attack(coords, pToAttack) {
        pToAttack.ownBoard.receiveAttack(coords);
    }

    function randomAttack(pToAttack) {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        while (pToAttack.ownBoard.hasAttack([y, x])) {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        }
        attack([y, x], pToAttack); // add pToAttack as an argument
    }

    // place ships randomly 
    function placeShipsRandomly() {
        let length = 5;
        let isHorizontal;
        while (ownBoard.shipCount() != 5) {
            isHorizontal = Math.random() < 0.5; 
            ownBoard.placeShip(findLegalCord(length, isHorizontal), length, isHorizontal);
            // to create 2nd ship of 3 length
            if (length == 3) {
                isHorizontal = Math.random() < 0.5;
                ownBoard.placeShip(findLegalCord(length, isHorizontal), length, isHorizontal);
            }
            // decrease length per loop iteration - (max 5 ships)
            length--;
        }
    }

    // find a placeable coord for a ship
    function findLegalCord(length, isHorizontal) {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        while (ownBoard.isOutOfBounds([y, x], length, isHorizontal) || ownBoard.willOverlap([y, x], length, isHorizontal)) {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        }
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
