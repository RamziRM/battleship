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
    const humanBoard = createGameBoard();
    const enemyBoard = createGameBoard();

    humanBoard.classList.add('human');
    computerBoard.classList.add('computer');
    computerBoard.classList.add('interact');

    // make boards interactable to attack
    makeAttackable(humanBoard, enemyBoard);

    main.appendChild(humanBoard, enemyBoard);
    return main;
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
                renderBoard(game.getEnemy().ownGameboard, enemyBoard);
                renderBoard(game.getHuman().ownGameboard, humanBoard);

                if (game.hasGameFinished())
                    loadGameEndingPopUp();
            });
        }
    }
}

// renderBoard
function renderBoard(boardToRender, boardOnScreen) {

}

// create the footer
function createFooter() {
    const footer = document.createElement('footer');
    const startButton = document.createElement('button');

    startButton.textContent = 'Start Game';
    footer.appendChild(startButton);
    return footer;
}