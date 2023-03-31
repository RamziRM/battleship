const Ship = require('./ship');

// Gameboard factory function
function Gameboard() {
    const board = [];
    const ships = [];

    // Create 10x10 board - 2D array
    // each cell is an object with hit and ship properties
    // inner array is a row, outer array is a column
    for (let x = 0; x < 10; x++) {
        let row = [];
        for (let y = 0; y < 10; y++) {
            row.push({
                hit: false,
                containsShip: -1
            });
        }
        board.push(row);
    }

    // const shipTypes = [
    //     { name: 'Carrier', length: 5 },
    //     { name: 'Battleship', length: 4 },
    //     { name: 'Cruiser', length: 3 },
    //     { name: 'Submarine', length: 3 },
    //     { name: 'Destroyer', length: 2 }
    // ];

    // startArr = [y, x] - array of coordinates
    // startArr[0] = y - (row) -- startArr[1] = x - (col)
    function placeShip(startArr, length, isHorizontal) {
        // new Ship object with length
        let shipToPlace = Ship(length);
        // push to empty ships array
        ships.push(shipToPlace);
        if (isHorizontal) {
            for (let i = startArr[1]; i < startArr[1] + length; ++i) {
                board[startArr[0]][i].containsShip = ships.length - 1;
            }
        } else {
            for (let i = startArr[0]; i < startArr[0] + length; ++i) {
                board[i][startArr[1]].containsShip = ships.length - 1;
            }
        }
    }

    // Receive attack
    // coords = [y, x]
    function receiveAttack(coords) {
        board[coords[0]][coords[1]].hit = true;
        if (board[coords[0]][coords[1]].containsShip != -1) {
            ships[board[coords[0]][coords[1]].containsShip].hit();
        }
    }

    function hasAttack(coords) {
        return board[coords[0]][coords[1]].hit;
    }

    function hasShip(coords) {
        return board[coords[0]][coords[1]].containsShip;
    }

    function getBoard() {
        return board;
    }

    // ** returns true if out of bounds
    function isOutOfBounds(startArr, length, isHorizontal) {
        if (isHorizontal) {
            return startArr[1] + length > 10;
        } else {
            return startArr[0] + length > 10;
        }
    }

    // ** returns true if ship overlaps
    function willOverlap(startArr, length, isHorizontal) {
        if (isHorizontal) {
            for (let i = startArr[1]; i < startArr[1] + length; ++i) {
                if (board[startArr[0]][i].containsShip != -1) {
                    return true;
                }
            }
        } else {
            for (let i = startArr[0]; i < startArr[0] + length; ++i) {
                if (board[i][startArr[1]].containsShip != -1) {
                    return true;
                }
            }
        }
        return false;
    }
    
    // Check if all ships are sunk - isSunk() is a method of Ship factory f()
    function allSunk() {
        return ships.every(ship => ship.isSunk());
    }

    function shipCount() {
        return ships.length;
    }

    // reset board
    function resetBoard() {
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                board[y][x].hit = false;
                board[y][x].containsShip = -1;
            }
        }
        ships = [];
    }

    return {
        placeShip,
        receiveAttack,
        hasAttack,
        hasShip,
        getBoard,
        isOutOfBounds,
        willOverlap,
        allSunk,
        shipCount,
        resetBoard
    };
}

module.exports = Gameboard;