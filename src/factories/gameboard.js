const Ship = require('./ship');

// Gameboard factory function
function Gameboard() {
    const board = [];
    // get board
    function getBoard() {
        return board;
    }

    // Create 10x10 board - 2D array
    // outer loop creates rows (y) - inner loop creates columns (x)
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
    // in 2d array: first index is row (y), second index is column (x)
    function placeShip(ship, x, y, isHorizontal) {
        if (isHorizontal) {
          for (let i = 0; i < ship.length; i++) {
            board[y][x+i] = { ship: ship, hit: false };
          }
        } else {
          for (let i = 0; i < ship.length; i++) {
            board[y+i][x] = { ship: ship, hit: false };
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
        board[y][x].hit = true;
        if (board[y][x].ship) {
            board[y][x].ship.hit();
        }
    }

    // Track missed attacks on board
    function missedAttacks() {
        return board.flat().filter(square => square.hit && !square.ship);
    }

    // Check if cell has been hit
    function isHit(x, y) {
        return board[y][x].hit;
    }

    // Check if all ships are sunk
    function allSunk() {
        return ships.every(ship => ship.isSunk());
    }

    function isSunk() {
        return this.length === this.hits;
    }

    // function to prevent out of bounds placement and overlapping ships
    function isValidPlacement(ship, x, y, isHorizontal) {
        if (isHorizontal) {
            if (x + ship.length > 10) {
                return false;
            }
        } else {
            if (y + ship.length > 10) {
                return false;
            }
        }

        for (let i = 0; i < ship.length; i++) {
            if (isHorizontal) {
                if (board[y][x+i].ship) {
                    return false;
                }
            } else {
                if (board[y+i][x].ship) {
                    return false;
                }
            }
        }
    }

    return {
        getBoard,
        ships,
        placeShip,
        randomPlaceShips,
        receiveAttack,
        missedAttacks,
        isHit,
        allSunk,
        isSunk,
        isValidPlacement
    };
}

module.exports = Gameboard;