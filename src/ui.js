// import
const mainGame = require('./mainGame.js');
const ship = require('./factories/ship.js');

// create the UI fully through JS
// initially 
function loadUI() {
    const header = createHeader();
    const main = createMain();
    const footer = createFooter();

    document.body.appendChild(header, main, footer);

    shipPlacementPopUp();
}

// create the header
function createHeader() {
    const header = document.createElement('header');
    const title = document.createElement('h1');

    title.textContent = 'Battleship';
    header.appendChild(title);
    return header;
}

// create the main
function createMain() {
    const main = document.createElement('main');
    main.classList.add('main');

    // create the game board
    const humanBoard = createInitialBoard();
    const enemyBoard = createInitialBoard();

    humanBoard.classList.add('human');
    computerBoard.classList.add('computer');
    computerBoard.classList.add('interact');

    // make boards interactable to attack
    makeAttackable(humanBoard, enemyBoard);

    main.appendChild(humanBoard, enemyBoard);
    return main;
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

// make both boards interactable to attack - By clicking on the computer board
// play round with coordinates of clicked square - then update both boards with new round info
// last check if game over - if so, trigger loadGameOverPopup()
function makeAttackable(enemyBoard, humanBoard) {
    const enemyBoardRows = enemyBoard.childNodes;
    for (let x = 0; x < 10; ++x) {
        const boardSquares = enemyBoardRows[x].childNodes;
        for (let y = 0; y < 10; ++y) {
            boardSquares[y].addEventListener('click', () => {
                game.playRound([x, y]);
                renderBoard(game.getEnemy().enemyBoard, enemyBoard);
                renderBoard(game.getHuman().ownBoard, humanBoard);

                if (game.hasGameFinished())
                gameEndingPopUp();
            });
        }
    }
}

// renderBoard
// 
function renderBoard(boardToRender, boardOnScreen) {
    const boardRows = boardOnScreen.childNodes;
    for (let x = 0; x < 10; ++x) {
        const boardSquares = boardRows[x].childNodes;
        for (let y = 0; y < 10; ++y) {
            const square = boardSquares[y];
            const squareInfo = boardToRender.getSquareInfo(x, y);

            if (squareInfo.isHit) {
                square.classList.add('hit');
            } else if (squareInfo.isMissed) {
                square.classList.add('missed');
            }
        }
    }
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
    const board = game.getUser().ownGameboard;
    for (let x = 0; x < 10; ++x) {
        const boardSquares = boardRows[x].childNodes;
        for (let y = 0; y < 10; ++y) {
            boardSquares[y].addEventListener('click', () => {
                if (board.isOutOfBounds([x, y], shipLengths[current], isHorizontal) || board.willCollide([x, y], shipLengths[current], isHorizontal))
                    return ;
                board.placeShip([x, y], shipLengths[current], isHorizontal);
                renderBoard(board, userBoard);

                if (current++ == 4) {
                    const boardOnScreen = document.querySelector(".user");
                    renderBoard(board, boardOnScreen);
                    background.remove();
                }
            });
        }
    }

    game.getEnemy().placeShipsRandomly();

    popUp.append(heading, info, rotateButton, userBoard);
    background.appendChild(popUp);

    document.body.appendChild(background);
}

// create the footer
function createFooter() {
    const footer = document.createElement('footer');
    const startButton = document.createElement('button');

    startButton.textContent = 'Start Game';
    footer.appendChild(startButton);
    return footer;
}

function gameEndingPopUp() {
    const popUp = document.createElement('div');
    const popUpText = document.createElement('p');
    const popUpButton = document.createElement('button');

    popUp.classList.add('pop-up');
    popUpText.classList.add('pop-up-text');
    popUpButton.classList.add('pop-up-button');

    popUpText.textContent = 'Game Over';
    popUpButton.textContent = 'Play Again';

    popUp.appendChild(popUpText, popUpButton);
    document.body.appendChild(popUp);

    popUpButton.addEventListener('click', () => {
        document.body.removeChild(popUp);
        mainGame();
    });
}

module.exports = loadUI;