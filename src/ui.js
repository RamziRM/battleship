// import
const mainGame = require('./mainGame.js');
const ship = require('./factories/ship.js');
const gameboard = require('./factories/gameboard.js');

// create the UI fully through JS

function loadUI(mainGame) {
    const header = createHeader();
    const mainContent = createMainContent();
    const footer = createFooter();

    document.body.append(header, mainContent, footer);
    shipPlacementPopUp();
}

function shipPlacementPopUp() {
    const background = document.createElement("div");
    background.classList.add("overlay");

    const popUp = document.createElement("div");
    popUp.classList.add("popUp");

    const heading = document.createElement("h2");
    heading.textContent = "Welcome to the battleship game";

    const info = document.createElement("span");
    info.textContent = "Place your ships";

    const rotateButton = document.createElement("button");
    rotateButton.addEventListener('click', () => {
        isHorizontal = !isHorizontal;
    });
    rotateButton.textContent = "Rotate";

    const userBoard = createInitialBoard();
    userBoard.classList.add("interactible");
    let isHorizontal = true;
    let current = 0;
    const shipLengths = [5, 4, 3, 3, 2];

    const boardRows = userBoard.childNodes;
    const board = mainGame().getHuman.ownBoard;

    for (let y = 0; y < 10; ++y) {
        const boardSquares = boardRows[y].childNodes;
        for (let x = 0; x < 10; ++x) {
            boardSquares[y].addEventListener('click', () => {
                if (board.isOutOfBounds([y, x], shipLengths[current], isHorizontal) || board.willOverlap([y, x], shipLengths[current], isHorizontal))
                    return ;
                board.placeShip([y, x], shipLengths[current], isHorizontal);
                renderBoard(board, userBoard);

                if (current++ == 4) {
                    const boardOnScreen = document.querySelector(".user");
                    renderBoard(board, boardOnScreen);
                    background.remove();
                }
            });
        }
    }

    mainGame().getEnemy.placeShipsRandomly;

    popUp.append(heading, info, rotateButton, userBoard);
    background.appendChild(popUp);

    document.body.appendChild(background);
}

function createHeader() {
    const header = document.createElement("header");
    const heading = document.createElement("h1");

    heading.textContent = "Battleship";
    header.appendChild(heading);
    return header;
}

function createMainContent() {
    const mainContent = document.createElement("section");
    mainContent.classList.add("main");

    let userBoard = createInitialBoard();
    let enemyBoard = createInitialBoard();
    enemyBoard.classList.add("interactible");
    enemyBoard.classList.add("enemy");
    userBoard.classList.add("user");
    makeAttackable(enemyBoard, userBoard);

    mainContent.append(userBoard, enemyBoard);
    return mainContent;
}

function createInitialBoard() {
    let board = document.createElement("div");
    board.classList.add("board");
    
    for (let x = 0; x < 10; ++x) {
        let boardRow = document.createElement("div");
        boardRow.classList.add("board-row");

        for (let y = 0; y < 10; ++y) {
            let square = document.createElement("div");
            square.classList.add("board-square");
            boardRow.appendChild(square);
        }
        board.appendChild(boardRow);
    }
    return board;
}

function renderBoard(boardToRender, boardOnScreen) {
    const rootStyles = getComputedStyle(document.documentElement);
    const boardOnScreenRows = boardOnScreen.childNodes;
    for (let x = 0; x < 10; ++x) {
        const boardSquares = boardOnScreenRows[x].childNodes;
        for (let y = 0; y < 10; ++y) {
            if (boardToRender.hasShip([x, y]) != -1) {
                if (boardToRender.hasAttack([x, y]))
                    boardSquares[y].style.backgroundColor = rootStyles.getPropertyValue("--hit-ship-square-color");
                else if (boardToRender == mainGame().getHuman.ownBoard)
                    boardSquares[y].style.backgroundColor = rootStyles.getPropertyValue("--ship-square-color");
            } else {
                if (boardToRender.hasBeenAttacked([x, y]))
                    boardSquares[y].style.backgroundColor = rootStyles.getPropertyValue("--empty-square-color");
            }
        }
    }
}

function makeAttackable(enemyBoard, userBoard) {
    const enemyBoardRows = enemyBoard.childNodes;
    for (let x = 0; x < 10; ++x) {
        const boardSquares = enemyBoardRows[x].childNodes;
        for (let y = 0; y < 10; ++y) {
            boardSquares[y].addEventListener('click', () => {
                renderBoard(mainGame().getEnemy.ownBoard, enemyBoard);
                renderBoard(mainGame().getHuman.ownBoard, userBoard);

                if (mainGame.hasGameFinished())
                    loadGameEndingPopUp();
            });
        }
    }
}

function createFooter() {
    const footer = document.createElement("footer");
    const authorNote = document.createElement("p");

    authorNote.textContent = "A copy - Soon modified look :)";
    footer.appendChild(authorNote);
    return footer;
}

function loadGameEndingPopUp() {
    const background = document.createElement("div");
    background.classList.add("overlay");

    const popUp = document.createElement("div");
    popUp.classList.add("popUp");

    const heading = document.createElement("h2");
    heading.textContent = mainGame.getHuman().ownBoard.allSunk() ? "You lost" : "You won";

    const playAgain = document.createElement("button");
    playAgain.textContent = "Play again";
    playAgain.addEventListener("click", () => {
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
    for (let x = 0; x < 10; ++x) {
        for (let y = 0; y < 10; ++y) {
            boardToReset.childNodes[x].childNodes[y].style.removeProperty("background-color");
        }
    }
}

module.exports = loadUI;