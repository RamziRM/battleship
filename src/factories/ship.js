// Ship factory function
// ship type?, length, number of hits, isSunk status

export const ship = function (length) {
    let hits = 0;

    function hit() {
        hits++;
    };
    
    function isSunk() {
        return (hits >= length);
    }

    function getHits() {
        return hits;
    }

    return { 
        hit, 
        isSunk,
        getHits
    };
}