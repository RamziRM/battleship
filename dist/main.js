/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/factories/gameboard.js":
/*!************************************!*\
  !*** ./src/factories/gameboard.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Ship = __webpack_require__(/*! ./ship */ \"./src/factories/ship.js\");\n\n// Gameboard factory function\nfunction Gameboard() {\n    const board = [];\n    const ships = [];\n\n    // Create 10x10 board - 2D array\n    // each cell is an object with hit and ship properties\n    // inner array is a row, outer array is a column\n    for (let x = 0; x < 10; x++) {\n        let row = [];\n        for (let y = 0; y < 10; y++) {\n            row.push({\n                hit: false,\n                containsShip: -1\n            });\n        }\n        board.push(row);\n    }\n\n    // startArr = [y, x] - array of coordinates\n    // startArr[0] = y - (row) -- startArr[1] = x - (col)\n    function placeShip(startArr, length, isHorizontal) {\n        // new Ship object with length\n        let shipToPlace = Ship(length);\n        // push to empty ships array\n        ships.push(shipToPlace);\n        if (isHorizontal) {\n            for (let i = startArr[1]; i < startArr[1] + length; ++i) {\n                board[startArr[0]][i].containsShip = ships.length - 1;\n            }\n        } else {\n            for (let i = startArr[0]; i < startArr[0] + length; ++i) {\n                board[i][startArr[1]].containsShip = ships.length - 1;\n            }\n        }\n    }\n\n    // Receive attack\n    // coords = [y, x]\n    function receiveAttack(coords) {\n        board[coords[0]][coords[1]].hit = true;\n        if (board[coords[0]][coords[1]].containsShip != -1) {\n            ships[board[coords[0]][coords[1]].containsShip].hit();\n        }\n    }\n\n    function hasAttack(coords) {\n        return board[coords[0]][coords[1]].hit;\n    }\n\n    function hasShip(coords) {\n        return board[coords[0]][coords[1]].containsShip;\n    }\n\n    function getBoard() {\n        return board;\n    }\n\n    // ** returns true if out of bounds\n    function isOutOfBounds(startArr, length, isHorizontal) {\n        if (isHorizontal) {\n            return startArr[1] + length > 10;\n        } else {\n            return startArr[0] + length > 10;\n        }\n    }\n\n    // ** returns true if ship overlaps\n    function willOverlap(startArr, length, isHorizontal) {\n        if (isHorizontal) {\n            for (let i = startArr[1]; i < startArr[1] + length; ++i) {\n                if (board[startArr[0]][i].containsShip != -1) {\n                    return true;\n                }\n            }\n        } else {\n            for (let i = startArr[0]; i < startArr[0] + length; ++i) {\n                if (board[i][startArr[1]].containsShip != -1) {\n                    return true;\n                }\n            }\n        }\n        return false;\n    }\n    \n    // Check if all ships are sunk - isSunk() is a method of Ship factory f()\n    function allSunk() {\n        return ships.every(ship => ship.isSunk());\n    }\n\n    function shipCount() {\n        return ships.length;\n    }\n\n    // reset board\n    function resetBoard() {\n        for (let x = 0; x < 10; x++) {\n            for (let y = 0; y < 10; y++) {\n                board[y][x].hit = false;\n                board[y][x].containsShip = -1;\n            }\n        }\n        ships.length = 0;\n    }\n\n    return {\n        placeShip,\n        receiveAttack,\n        hasAttack,\n        hasShip,\n        getBoard,\n        isOutOfBounds,\n        willOverlap,\n        allSunk,\n        shipCount,\n        resetBoard\n    };\n}\n\nmodule.exports = Gameboard;\n\n//# sourceURL=webpack://battleship/./src/factories/gameboard.js?");

/***/ }),

/***/ "./src/factories/ship.js":
/*!*******************************!*\
  !*** ./src/factories/ship.js ***!
  \*******************************/
/***/ ((module) => {

eval("// Ship factory function\n// ship type?, length, number of hits, isSunk status\n\nfunction Ship(length) {\n    let hits = 0;\n\n    function hit() {\n        hits++;\n    };\n    \n    function isSunk() {\n        return (hits >= length);\n    }\n\n    function getHits() {\n        return hits;\n    }\n\n    return { \n        hit, \n        isSunk,\n        getHits\n    };\n}\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack://battleship/./src/factories/ship.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const loadUI = __webpack_require__(/*! ./ui.js */ \"./src/ui.js\");\n\nloadUI();\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/mainGame.js":
/*!*************************!*\
  !*** ./src/mainGame.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// import modules\nconst player = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n\n// main game loop\n// 1. create players\nfunction mainGame() {\n    let human = player();\n    let enemy = player();\n    let turn = 0;\n\n    // playRound function\n    // play round: recieve human choice, if square hit: true return, if not, human.attack, computer.randomAttack\n    function playRound(humanChoice) {\n        // check if gameOver is true\n        if (human.ownBoard.allSunk() || enemy.enemyBoard.allSunk()) {\n            return;\n        }\n        if (enemy.enemyBoard.isHit(humanChoice))\n            return;\n        human.attack(humanChoice, enemy);\n        enemy.randomAttack(human);\n    }\n\n    // get human and get enemy\n    function getHuman() {\n        return human;\n    }\n\n    function getEnemy() {\n        return enemy;\n    }\n\n    function hasGameFinished() {\n        return human.ownBoard.allSunk() || enemy.enemyBoard.allSunk();\n    }\n\n    // restart game\n    function restartGame() {\n        human.ownBoard.resetBoard();\n        enemy.enemyBoard.resetBoard();\n        turn = 0;\n    };\n\n    // return functions\n    return {\n        playRound,\n        getHuman,\n        getEnemy,\n        hasGameFinished,\n        restartGame\n    }\n}\n\nmodule.exports = mainGame;\n\n\n\n//# sourceURL=webpack://battleship/./src/mainGame.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const gameboard = __webpack_require__(/*! ./factories/gameboard */ \"./src/factories/gameboard.js\");\n\nfunction Player() {\n    const ownBoard = gameboard();\n\n    function attack(coords, pToAttack) {\n        pToAttack.ownBoard.receiveAttack(coords);\n    }\n\n  \n    function randomAttack(pToAttack) {\n      let x = Math.floor(Math.random() * 10);\n      let y = Math.floor(Math.random() * 10);\n      while (pToAttack.ownBoard.hasAttack([y, x]));\n      pToAttack.ownBoard.receiveAttack([y, x]);\n    }\n\n    // place ships randomly \n    function placeShipsRandomly() {\n        let length = 5;\n        let isHorizontal;\n        while (ownBoard.shipCount() != 5) {\n            isHorizontal = Math.random() < 0.5; \n            ownBoard.placeShip(findLegalCord(length, isHorizontal), length, isHorizontal);\n            // to create 2nd ship of 3 length\n            if (length == 3) {\n                isHorizontal = Math.random() < 0.5;\n                ownBoard.placeShip(findLegalCord(length, isHorizontal), length, isHorizontal);\n            }\n            // decrease l per loop iteration - (max 5 ships)\n            length--;\n        }\n    }\n\n    // find a placeable cord for a ship\n    function findLegalCord(length, isHorizontal) {\n        x = Math.floor(Math.random() * 10);\n        y = Math.floor(Math.random() * 10);\n        while (ownBoard.isOutOfBounds([y, x], length, isHorizontal) || ownBoard.willOverlap([y, x], length, isHorizontal));\n        return [y, x];\n    }\n\n    return {\n        ownBoard,\n        attack,\n        randomAttack,\n        placeShipsRandomly,\n        findLegalCord\n    };\n\n}\n\nmodule.exports = Player;\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// import\nconst mainGame = __webpack_require__(/*! ./mainGame.js */ \"./src/mainGame.js\");\nconst ship = __webpack_require__(/*! ./factories/ship.js */ \"./src/factories/ship.js\");\nconst gameboard = __webpack_require__(/*! ./factories/gameboard.js */ \"./src/factories/gameboard.js\");\n\n// create the UI fully through JS\n\nfunction loadUI() {\n    const header = createHeader();\n    const mainContent = createMainContent();\n    const footer = createFooter();\n\n    document.body.append(header, mainContent, footer);\n    shipPlacementPopUp();\n}\n\nfunction shipPlacementPopUp() {\n    const background = document.createElement(\"div\");\n    background.classList.add(\"overlay\");\n\n    const popUp = document.createElement(\"div\");\n    popUp.classList.add(\"popUp\");\n\n    const heading = document.createElement(\"h2\");\n    heading.textContent = \"Welcome to the battleship game\";\n\n    const info = document.createElement(\"span\");\n    info.textContent = \"Place your ships\";\n\n    const rotateButton = document.createElement(\"button\");\n    rotateButton.addEventListener('click', () => {\n        isHorizontal = !isHorizontal;\n    });\n    rotateButton.textContent = \"Rotate\";\n\n    const userBoard = createInitialBoard();\n    userBoard.classList.add(\"interactible\");\n    let isHorizontal = true;\n    let current = 0;\n    const shipLengths = [5, 4, 3, 3, 2];\n\n    const boardRows = userBoard.childNodes;\n    const board = mainGame().getHuman().ownBoard;\n\n    for (let x = 0; x < 10; ++x) {\n        const boardSquares = boardRows[x].childNodes;\n        for (let y = 0; y < 10; ++y) {\n            boardSquares[y].addEventListener('click', () => {\n                if (board.isOutOfBounds([x, y], shipLengths[current], isHorizontal) || board.willOverlap([x, y], shipLengths[current], isHorizontal))\n                    return ;\n                board.placeShip([x, y], shipLengths[current], isHorizontal);\n                renderBoard(board, userBoard);\n\n                if (current++ == 4) {\n                    const boardOnScreen = document.querySelector(\".user\");\n                    renderBoard(board, boardOnScreen);\n                    background.remove();\n                }\n            });\n        }\n    }\n\n    mainGame().getEnemy().placeShipsRandomly();\n\n    popUp.append(heading, info, rotateButton, userBoard);\n    background.appendChild(popUp);\n\n    document.body.appendChild(background);\n}\n\nfunction createHeader() {\n    const header = document.createElement(\"header\");\n    const heading = document.createElement(\"h1\");\n\n    heading.textContent = \"Battleship\";\n    header.appendChild(heading);\n    return header;\n}\n\nfunction createMainContent() {\n    const mainContent = document.createElement(\"section\");\n    mainContent.classList.add(\"main\");\n\n    let userBoard = createInitialBoard();\n    let enemyBoard = createInitialBoard();\n    enemyBoard.classList.add(\"interactible\");\n    enemyBoard.classList.add(\"enemy\");\n    userBoard.classList.add(\"user\");\n    makeAttackable(enemyBoard, userBoard);\n\n    mainContent.append(userBoard, enemyBoard);\n    return mainContent;\n}\n\nfunction createInitialBoard() {\n    let board = document.createElement(\"div\");\n    board.classList.add(\"board\");\n    \n    for (let x = 0; x < 10; ++x) {\n        let boardRow = document.createElement(\"div\");\n        boardRow.classList.add(\"board-row\");\n\n        for (let y = 0; y < 10; ++y) {\n            let square = document.createElement(\"div\");\n            square.classList.add(\"board-square\");\n            boardRow.appendChild(square);\n        }\n        board.appendChild(boardRow);\n    }\n    return board;\n}\n\nfunction renderBoard(boardToRender, boardOnScreen) {\n    const rootStyles = getComputedStyle(document.documentElement);\n    const boardOnScreenRows = boardOnScreen.childNodes;\n    for (let x = 0; x < 10; ++x) {\n        const boardSquares = boardOnScreenRows[x].childNodes;\n        for (let y = 0; y < 10; ++y) {\n            if (boardToRender.hasShip([x, y]) != -1) {\n                if (boardToRender.hasAttack([x, y]))\n                    boardSquares[y].style.backgroundColor = rootStyles.getPropertyValue(\"--hit-ship-square-color\");\n                else if (boardToRender == mainGame().getHuman().ownGameboard)\n                    boardSquares[y].style.backgroundColor = rootStyles.getPropertyValue(\"--ship-square-color\");\n            } else {\n                if (boardToRender.hasBeenAttacked([x, y]))\n                    boardSquares[y].style.backgroundColor = rootStyles.getPropertyValue(\"--empty-square-color\");\n            }\n        }\n    }\n}\n\nfunction makeAttackable(enemyBoard, userBoard) {\n    const enemyBoardRows = enemyBoard.childNodes;\n    for (let x = 0; x < 10; ++x) {\n        const boardSquares = enemyBoardRows[x].childNodes;\n        for (let y = 0; y < 10; ++y) {\n            boardSquares[y].addEventListener('click', () => {\n                renderBoard(mainGame().getEnemy().ownGameboard, enemyBoard);\n                renderBoard(mainGame().getHuman().ownGameboard, userBoard);\n\n                if (mainGame().hasGameFinished())\n                    loadGameEndingPopUp();\n            });\n        }\n    }\n}\n\nfunction createFooter() {\n    const footer = document.createElement(\"footer\");\n    const authorNote = document.createElement(\"p\");\n\n    authorNote.textContent = \"A copy - Soon modified look :)\";\n    footer.appendChild(authorNote);\n    return footer;\n}\n\nfunction loadGameEndingPopUp() {\n    const background = document.createElement(\"div\");\n    background.classList.add(\"overlay\");\n\n    const popUp = document.createElement(\"div\");\n    popUp.classList.add(\"popUp\");\n\n    const heading = document.createElement(\"h2\");\n    heading.textContent = mainGame().getHuman().ownGameboard.allShipsSunk() ? \"You lost\" : \"You won\";\n\n    const playAgain = document.createElement(\"button\");\n    playAgain.textContent = \"Play again\";\n    playAgain.addEventListener(\"click\", () => {\n        mainGame().restartGame();\n        resetBoardAppearance(document.querySelector(\".user\"));\n        resetBoardAppearance(document.querySelector(\".enemy\"));\n        background.remove();\n        loadShipPlacementPopUp();\n    });\n\n    popUp.append(heading, playAgain);\n    background.appendChild(popUp);\n    document.body.appendChild(background);\n}\n\nfunction resetBoardAppearance(boardToReset) {\n    for (let x = 0; x < 10; ++x) {\n        for (let y = 0; y < 10; ++y) {\n            boardToReset.childNodes[x].childNodes[y].style.removeProperty(\"background-color\");\n        }\n    }\n}\n\nmodule.exports = loadUI;\n\n//# sourceURL=webpack://battleship/./src/ui.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;