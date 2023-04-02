"use strict";

// import
var mainGame = require('./mainGame.js');
var ship = require('./factories/ship.js');
var gameboard = require('./factories/gameboard.js');

// create the UI fully through JS

function loadUI() {
  var header = createHeader();
  var mainContent = createMainContent();
  var footer = createFooter();
  document.body.append(header, mainContent, footer);
  shipPlacementPopUp();
}
function shipPlacementPopUp() {
  var background = document.createElement("div");
  background.classList.add("overlay");
  var popUp = document.createElement("div");
  popUp.classList.add("popUp");
  var heading = document.createElement("h2");
  heading.textContent = "Welcome to the battleship game";
  var info = document.createElement("span");
  info.textContent = "Place your ships";
  var rotateButton = document.createElement("button");
  rotateButton.addEventListener('click', function () {
    isHorizontal = !isHorizontal;
  });
  rotateButton.textContent = "Rotate";
  var userBoard = createInitialBoard();
  userBoard.classList.add("interactible");
  var isHorizontal = true;
  var current = 0;
  var shipLengths = [5, 4, 3, 3, 2];
  var boardRows = userBoard.childNodes;
  var board = mainGame.getHuman().ownBoard;
  var _loop = function _loop(x) {
    var boardSquares = boardRows[x].childNodes;
    var _loop2 = function _loop2(y) {
      boardSquares[y].addEventListener('click', function () {
        if (board.isOutOfBounds([x, y], shipLengths[current], isHorizontal) || board.willOverlap([x, y], shipLengths[current], isHorizontal)) return;
        board.placeShip([x, y], shipLengths[current], isHorizontal);
        renderBoard(board, userBoard);
        if (current++ == 4) {
          var boardOnScreen = document.querySelector(".user");
          renderBoard(board, boardOnScreen);
          background.remove();
        }
      });
    };
    for (var y = 0; y < 10; ++y) {
      _loop2(y);
    }
  };
  for (var x = 0; x < 10; ++x) {
    _loop(x);
  }
  mainGame.getEnemy().placeShipsRandomly();
  popUp.append(heading, info, rotateButton, userBoard);
  background.appendChild(popUp);
  document.body.appendChild(background);
}
function createHeader() {
  var header = document.createElement("header");
  var heading = document.createElement("h1");
  heading.textContent = "Battleship";
  header.appendChild(heading);
  return header;
}
function createMainContent() {
  var mainContent = document.createElement("section");
  mainContent.classList.add("main");
  var userBoard = createInitialBoard();
  var enemyBoard = createInitialBoard();
  enemyBoard.classList.add("interactible");
  enemyBoard.classList.add("enemy");
  userBoard.classList.add("user");
  makeAttackable(enemyBoard, userBoard);
  mainContent.append(userBoard, enemyBoard);
  return mainContent;
}
function createInitialBoard() {
  var board = document.createElement("div");
  board.classList.add("board");
  for (var x = 0; x < 10; ++x) {
    var boardRow = document.createElement("div");
    boardRow.classList.add("board-row");
    for (var y = 0; y < 10; ++y) {
      var square = document.createElement("div");
      square.classList.add("board-square");
      boardRow.appendChild(square);
    }
    board.appendChild(boardRow);
  }
  return board;
}
function renderBoard(boardToRender, boardOnScreen) {
  var rootStyles = getComputedStyle(document.documentElement);
  var boardOnScreenRows = boardOnScreen.childNodes;
  for (var x = 0; x < 10; ++x) {
    var boardSquares = boardOnScreenRows[x].childNodes;
    for (var y = 0; y < 10; ++y) {
      if (boardToRender.hasShip([x, y]) != -1) {
        if (boardToRender.hasAttack([x, y])) boardSquares[y].style.backgroundColor = rootStyles.getPropertyValue("--hit-ship-square-color");else if (boardToRender == mainGame.getHuman().ownBoard) boardSquares[y].style.backgroundColor = rootStyles.getPropertyValue("--ship-square-color");
      } else {
        if (boardToRender.hasBeenAttacked([x, y])) boardSquares[y].style.backgroundColor = rootStyles.getPropertyValue("--empty-square-color");
      }
    }
  }
}
function makeAttackable(enemyBoard, userBoard) {
  var enemyBoardRows = enemyBoard.childNodes;
  for (var x = 0; x < 10; ++x) {
    var boardSquares = enemyBoardRows[x].childNodes;
    for (var y = 0; y < 10; ++y) {
      boardSquares[y].addEventListener('click', function () {
        renderBoard(mainGame.getEnemy().ownBoard, enemyBoard);
        renderBoard(mainGame.getHuman().ownBoard, userBoard);
        if (mainGame.hasGameFinished()) loadGameEndingPopUp();
      });
    }
  }
}
function createFooter() {
  var footer = document.createElement("footer");
  var authorNote = document.createElement("p");
  authorNote.textContent = "A copy - Soon modified look :)";
  footer.appendChild(authorNote);
  return footer;
}
function loadGameEndingPopUp() {
  var background = document.createElement("div");
  background.classList.add("overlay");
  var popUp = document.createElement("div");
  popUp.classList.add("popUp");
  var heading = document.createElement("h2");
  heading.textContent = mainGame.getHuman().ownBoard.allSunk() ? "You lost" : "You won";
  var playAgain = document.createElement("button");
  playAgain.textContent = "Play again";
  playAgain.addEventListener("click", function () {
    mainGame.restartGame();
    resetBoardAppearance(document.querySelector(".user"));
    resetBoardAppearance(document.querySelector(".enemy"));
    background.remove();
    shipPlacementPopUp();
  });
  popUp.append(heading, playAgain);
  background.appendChild(popUp);
  document.body.appendChild(background);
}
function resetBoardAppearance(boardToReset) {
  for (var x = 0; x < 10; ++x) {
    for (var y = 0; y < 10; ++y) {
      boardToReset.childNodes[x].childNodes[y].style.removeProperty("background-color");
    }
  }
}
module.exports = loadUI;