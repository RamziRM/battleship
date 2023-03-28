// import ship factory function
const Ship = require('../factories/ship');

// Ship factory function tests
test('Ship factory function exists', () => {
    expect(Ship).toBeDefined();
}
);

test('Ship factory function returns an object', () => {
    expect(typeof Ship()).toBe('object');
}
);

test('Ship factory function returns an object with a length property', () => {
    expect(Ship()).toHaveProperty('length');
}
);
