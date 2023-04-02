"use strict";

// Ship factory function
// ship type?, length, number of hits, isSunk status

function Ship(length) {
  var hits = 0;
  function hit() {
    hits++;
  }
  ;
  function isSunk() {
    return hits >= length;
  }
  function getHits() {
    return hits;
  }
  return {
    hit: hit,
    isSunk: isSunk,
    getHits: getHits
  };
}
module.exports = Ship;