const Gameboard = require('../factories/gameboard');

let testGameboard;
let board;

// to initialize a gameboard for each test
beforeEach(() => {
    // setting testgameboard to a new gameboard
    testGameboard = Gameboard();
    board = [];
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
});

// Test 1:
test('placeShip() places ship horizontally on the board', () => {
    testGameboard.placeShip([0, 0], 3, true);
    // for test - manually fill in cells
    board[0][0].containsShip = 0;
    board[0][1].containsShip = 0;
    board[0][2].containsShip = 0;
    expect(testGameboard.getBoard()).toEqual(board);
});

// Test 2:
test('placeShip() places ship vertically on the board', () => {
    testGameboard.placeShip([0, 0], 4, false);
    // for test - manually fill in cells
    board[0][0].containsShip = 0;
    board[1][0].containsShip = 0;
    board[2][0].containsShip = 0;
    board[3][0].containsShip = 0;
    expect(testGameboard.getBoard()).toEqual(board);
});

test('receiveAttack() registers a hit of a ship by increasing hits', () => {
    testGameboard.placeShip([0, 0], 3, true);
    testGameboard.receiveAttack([0, 0]);
    testGameboard.receiveAttack([0, 0]);
    expect(testGameboard.getBoard()[0][0].hit).toBe(true);
    expect(testGameboard.getBoard()[0][0].containsShip).toBe(0);
    expect(testGameboard.hasAttack([0, 0])).toBe(true);
});

// test if out of bounds check works
// multiple case scenarios validations
test('isOutOfBounds() returns true if out of bounds', () => {
    expect(testGameboard.isOutOfBounds([0, 0], 3, true)).toBe(false);
    expect(testGameboard.isOutOfBounds([0, 0], 3, false)).toBe(false);

    expect(testGameboard.isOutOfBounds([0, 0], 11, true)).toBe(true);
    expect(testGameboard.isOutOfBounds([0, 0], 11, false)).toBe(true);
});

// test if ship overlaps check works
test('willOverlap() returns true if ship overlaps', () => {
    testGameboard.placeShip([0, 0], 3, true);
    expect(testGameboard.willOverlap([0, 0], 3, true)).toBe(true);
    expect(testGameboard.willOverlap([0, 0], 3, false)).toBe(true);

    expect(testGameboard.willOverlap([0, 0], 4, true)).toBe(true);
    expect(testGameboard.willOverlap([0, 0], 4, false)).toBe(true);

    expect(testGameboard.willOverlap([1, 1], 2, true)).toBe(false);
    expect(testGameboard.willOverlap([1, 1], 2, false)).toBe(false);
});

// test resetBoard()
test('resetBoard() resets the board', () => {
    testGameboard.placeShip([0, 0], 3, true);
    testGameboard.receiveAttack([0, 0]);
    testGameboard.resetBoard();
    expect(testGameboard.getBoard()).toEqual(board);
});