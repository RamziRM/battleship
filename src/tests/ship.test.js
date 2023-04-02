// import ship factory function
const Ship = require('../factories/ship');

// Ship factory function tests

// test if ship registers hits - adding a hit increases the number of hits
test('Ship can register 1 hit', () => {
    const testShip = Ship(4);
    testShip.hit();
    expect(testShip.getHits()).toBe(1);
}
);

test('register 3 hits to testShip', () => {
    const testShip = Ship(4);
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(testShip.getHits()).toBe(3);
});


test('Can testShip sink -- update isSunk property', () => {
    const testShip = Ship(4);
    for (let i = 0; i < 4; i++) {
        testShip.hit();
    }
    expect(testShip.isSunk()).toBe(true);
});
