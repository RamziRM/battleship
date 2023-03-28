const Ship = require('./ship');

// Gameboard factory function
function Gameboard() {
    const board = [];

    // Create 10x10 board
    for (let i = 0; i < 10; i++) {
        board.push([]);
        for (let j = 0; j < 10; j++) {
            board[i].push({
                x: j,
                y: i,
                hit: false,
                ship: null
            });
        }
    }

    const shipTypes = [
        { name: 'Carrier', length: 5 },
        { name: 'Battleship', length: 4 },
        { name: 'Cruiser', length: 3 },
        { name: 'Submarine', length: 3 },
        { name: 'Destroyer', length: 2 }
    ];

    const ships = shipTypes.map(ship => Ship(ship.name, ship.length));

    // Place ships on board
    function placeShip(ship, x, y, isHorizontal) {
        if (isHorizontal) {
          for (let i = 0; i < ship.length; i++) {
            board[x][y+i] = { ship: ship, hit: false };
          }
        } else {
          for (let i = 0; i < ship.length; i++) {
            board[x+i][y] = { ship: ship, hit: false };
          }
        }
    }

    // Randomly place ships on board
    function randomPlaceShips() {
        ships.forEach(ship => {
            let isHorizontal = Math.random() < 0.5;
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);

            if (isHorizontal) {
                if (x + ship.length > 10) {
                    x -= ship.length;
                }
            } else {
                if (y + ship.length > 10) {
                    y -= ship.length;
                }
            }

            placeShip(ship, x, y, isHorizontal);
        });
    }

    // Receive attack
    function receiveAttack(x, y) {
        board[x][y].hit = true;
        if (board[x][y].ship) {
            board[x][y].ship.hit();
        }
    }

    // Track missed attacks on board
    function missedAttacks() {
        return board.flat().filter(square => square.hit && !square.ship);
    }

    // Check if all ships are sunk
    function allSunk() {
        return ships.every(ship => ship.isSunk());
    }

    function isSunk() {
        return this.length === this.hits;
    }

    return {
        board,
        ships,
        placeShip,
        randomPlaceShips,
        receiveAttack,
        missedAttacks,
        allSunk,
        isSunk
    };
}

module.exports = Gameboard;