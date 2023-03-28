// Ship factory function
// ship type?, length, number of hits, isSunk status

function Ship(length) {
    let hits = 0;
    let isSunk = false;

    function hit() {
    hits++;
    if (hits === length) {
        isSunk = true;
    }
    }

    function getIsSunk() {
    return isSunk;
    }

    return { 
        length, 
        hit, 
        getIsSunk
    };
}

module.exports = Ship;