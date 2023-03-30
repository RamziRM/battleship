const Ship = require('./ship');

// Gameboard factory function
function Gameboard() {
    const board = [];
    // get board
    function getBoard() {
        return board;
    }

    // Create 10x10 board - 2D array
    // each cell is an object with hit and ship properties
    // inner array is a row, outer array is a column
    for (let x = 0; x < 10; x++) {
        let row = [];
        for (let y = 0; y < 10; y++) {
            row.push({
                hit: false,
                ship: null
            });
        }
        board.push(row);
    }

    const shipTypes = [
        { name: 'Carrier', length: 5 },
        { name: 'Battleship', length: 4 },
        { name: 'Cruiser', length: 3 },
        { name: 'Submarine', length: 3 },
        { name: 'Destroyer', length: 2 }
    ];

    const ships = shipTypes.map(ship => Ship(ship.name, ship.length));
    // howt to call ships array?
    // ships[0].name is Carrier
    // 
    // shipTypes is an array of objects with name and length properties - ships is an array of ship objects. the map function creates a new array of ship objects from the shipTypes array of objects. New array looks like this: 
    // [{name: 'Carrier', length: 5, hits: 0, isSunk: false}, {name: 'Battleship', length: 4, hits: 0, isSunk: false}, etc.]

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
    // returns true if placement is valid
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

    // reset board
    function resetBoard() {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                board[i][j] = {
                    x: j,
                    y: i,
                    hit: false,
                    ship: null
                };
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
        isValidPlacement,
        resetBoard
    };
}

module.exports = Gameboard;