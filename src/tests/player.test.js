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