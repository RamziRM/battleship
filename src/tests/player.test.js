const Player = require('../player');
const Gameboard = require('../factories/gameboard');


let testPlayer;
let enemyPlayer;
beforeEach(() => {
    testPlayer = Player();
    enemyPlayer = Player();
});

// test if player can recieve attack
test('player can recieve attack', () => {
    testPlayer.ownBoard.placeShip([3, 4], 2, true);
    enemyPlayer.attack([3, 4], testPlayer);
    expect(testPlayer.ownBoard.hasAttack([3, 4])).toBe(true);
});

// test if can make random attack - loop through board and check if any of the squares have been attacked - expect 1 hit only
test('player can make random attack', () => {
    enemyPlayer.randomAttack(testPlayer);
    let hasAttack = 0;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (testPlayer.ownBoard.hasAttack([i, j])) {
                hasAttack++;
            }
        }
    }
    expect(hasAttack).toBe(1);
});