// Ship factory function
// ship type, length, number of hits, isSunk status

function Ship(type, length) {
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

  return { type, length, hit, getIsSunk };
}