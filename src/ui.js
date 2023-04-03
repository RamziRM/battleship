// import
import { game } from "./mainGame.js";
import { ship } from "./factories/ship.js";


export function loadUI() {
    const header = createHeader();
    const mainContent = createMainContent();
    const footer = createFooter();

    document.body.append(header, mainContent, footer);
    loadShipPlacementPopUp();
}

function loadShipPlacementPopUp() {
    const background = document.createElement("div");
    background.classList.add("overlay");

    const popUp = document.createElement("div");
    popUp.classList.add("popUp");

    const heading = document.createElement("h2");
    heading.textContent = "Welcome to the battleship game";

    const info = document.createElement("span");
    info.textContent = "Place your ships";

    const rotateButton = document.createElement("button");
    let isHorizontal = true;
    rotateButton.addEventListener('click', () => {
        isHorizontal = !isHorizontal;
        console.log("Clicked rotateButton")
    });
    rotateButton.textContent = "Rotate";

    const userBoard = createInitialBoard();
    userBoard.classList.add("interactible");
    let current = 0;
    const shipLengths = [5, 4, 3, 3, 2];

    const boardRows = userBoard.childNodes;
    const board = game().getHuman().ownBoard;
    for (let x = 0; x < 10; ++x) {
        const boardSquares = boardRows[x].childNodes;
        for (let y = 0; y < 10; ++y) {
            boardSquares[y].addEventListener('click', () => {
                console.log("Clicked square");
                if (board.isOutOfBounds([x, y], shipLengths[current], isHorizontal) || board.willOverlap([x, y], shipLengths[current], isHorizontal))
                    return alert("Invalid placement");

                board.placeShip([x, y], shipLengths[current], isHorizontal);
                console.log(board.getBoard());
                console.log(board.shipCount());
                renderBoard(board, userBoard);
                if (current < 5) {
                    current++;
                    console.log(current);
                } else {
                    const boardOnScreen = document.querySelector(".user");
                    renderBoard(board, boardOnScreen);
                    background.remove();
                }
            });
        }
    }

    game().getEnemy().placeShipsRandomly();

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
    
    for (let y = 0; y < 10; ++y) {
        let boardRow = document.createElement("div");
        boardRow.classList.add("board-row");

        for (let x = 0; x < 10; ++x) {
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
                console.log("has ship");
                console.log(game.getHuman())
                if (boardToRender.hasAttack([x, y]))
                    boardSquares[y].style.backgroundColor = rootStyles.getPropertyValue("--hit-ship-square-color");
                else if (boardToRender == game.getHuman().ownBoard) {
                    console.log('add ship color here')
                    boardSquares[y].style.backgroundColor = rootStyles.getPropertyValue("--ship-square-color");
            } else {
                if (boardToRender.hasAttack([x, y]))
                    boardSquares[y].style.backgroundColor = rootStyles.getPropertyValue("--empty-square-color");
                }
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
                game.playRound([x, y]);
                renderBoard(game.getEnemy().ownBoard, enemyBoard);
                renderBoard(game.getHuman().ownBoard, userBoard);

                if (game.hasGameFinished())
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
    heading.textContent = game.getHuman().ownBoard.allSunk ? "You lost" : "You won";

    const playAgain = document.createElement("button");
    playAgain.textContent = "Play again";
    playAgain.addEventListener("click", () => {
        game.restartGame;
        resetBoardAppearance(document.querySelector(".user"));
        resetBoardAppearance(document.querySelector(".enemy"));
        background.remove();
        // shipPlacementPopUp();
    });

    popUp.append(heading, playAgain);
    background.appendChild(popUp);
    document.body.appendChild(background);
}

function resetBoardAppearance(boardToReset) {
    for (let y = 0; y < 10; ++y) {
        for (let x = 0; x < 10; ++x) {
            boardToReset.childNodes[y].childNodes[x].style.removeProperty("background-color");
        }
    }
}