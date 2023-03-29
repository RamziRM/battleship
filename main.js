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

eval("const Ship = __webpack_require__(/*! ./ship */ \"./src/factories/ship.js\");\n\n// Gameboard factory function\nfunction Gameboard() {\n    const board = [];\n    // get board\n    function getBoard() {\n        return board;\n    }\n\n    // Create 10x10 board - 2D array\n    // outer loop creates rows (y) - inner loop creates columns (x)\n    for (let i = 0; i < 10; i++) {\n        board.push([]);\n        for (let j = 0; j < 10; j++) {\n            board[i].push({\n                x: j,\n                y: i,\n                hit: false,\n                ship: null\n            });\n        }\n    }\n\n    const shipTypes = [\n        { name: 'Carrier', length: 5 },\n        { name: 'Battleship', length: 4 },\n        { name: 'Cruiser', length: 3 },\n        { name: 'Submarine', length: 3 },\n        { name: 'Destroyer', length: 2 }\n    ];\n\n    const ships = shipTypes.map(ship => Ship(ship.name, ship.length));\n\n    // Place ships on board\n    // in 2d array: first index is row (y), second index is column (x)\n    function placeShip(ship, x, y, isHorizontal) {\n        if (isHorizontal) {\n          for (let i = 0; i < ship.length; i++) {\n            board[y][x+i] = { ship: ship, hit: false };\n          }\n        } else {\n          for (let i = 0; i < ship.length; i++) {\n            board[y+i][x] = { ship: ship, hit: false };\n          }\n        }\n    }\n\n    // Randomly place ships on board\n    function randomPlaceShips() {\n        ships.forEach(ship => {\n            let isHorizontal = Math.random() < 0.5;\n            let x = Math.floor(Math.random() * 10);\n            let y = Math.floor(Math.random() * 10);\n\n            if (isHorizontal) {\n                if (x + ship.length > 10) {\n                    x -= ship.length;\n                }\n            } else {\n                if (y + ship.length > 10) {\n                    y -= ship.length;\n                }\n            }\n\n            placeShip(ship, x, y, isHorizontal);\n        });\n    }\n\n    // Receive attack\n    function receiveAttack(x, y) {\n        board[y][x].hit = true;\n        if (board[y][x].ship) {\n            board[y][x].ship.hit();\n        }\n    }\n\n    // Track missed attacks on board\n    function missedAttacks() {\n        return board.flat().filter(square => square.hit && !square.ship);\n    }\n\n    // Check if cell has been hit\n    function isHit(x, y) {\n        return board[y][x].hit;\n    }\n\n    // Check if all ships are sunk\n    function allSunk() {\n        return ships.every(ship => ship.isSunk());\n    }\n\n    function isSunk() {\n        return this.length === this.hits;\n    }\n\n    // function to prevent out of bounds placement and overlapping ships\n    function isValidPlacement(ship, x, y, isHorizontal) {\n        if (isHorizontal) {\n            if (x + ship.length > 10) {\n                return false;\n            }\n        } else {\n            if (y + ship.length > 10) {\n                return false;\n            }\n        }\n\n        for (let i = 0; i < ship.length; i++) {\n            if (isHorizontal) {\n                if (board[y][x+i].ship) {\n                    return false;\n                }\n            } else {\n                if (board[y+i][x].ship) {\n                    return false;\n                }\n            }\n        }\n    }\n\n    // reset board\n    function resetBoard() {\n        for (let i = 0; i < 10; i++) {\n            for (let j = 0; j < 10; j++) {\n                board[i][j] = {\n                    x: j,\n                    y: i,\n                    hit: false,\n                    ship: null\n                };\n            }\n        }\n    }\n\n\n    return {\n        getBoard,\n        ships,\n        placeShip,\n        randomPlaceShips,\n        receiveAttack,\n        missedAttacks,\n        isHit,\n        allSunk,\n        isSunk,\n        isValidPlacement,\n        resetBoard\n    };\n}\n\nmodule.exports = Gameboard;\n\n//# sourceURL=webpack://battleship/./src/factories/gameboard.js?");

/***/ }),

/***/ "./src/factories/ship.js":
/*!*******************************!*\
  !*** ./src/factories/ship.js ***!
  \*******************************/
/***/ ((module) => {

eval("// Ship factory function\n// ship type?, length, number of hits, isSunk status\n\nfunction Ship(length) {\n    let hits = 0;\n    let isSunk = false;\n\n    function hit() {\n    hits++;\n    if (hits === length) {\n        isSunk = true;\n    }\n    }\n\n    function getIsSunk() {\n    return isSunk;\n    }\n\n    return { \n        length, \n        hit, \n        getIsSunk\n    };\n}\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack://battleship/./src/factories/ship.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui.js */ \"./src/ui.js\");\n/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ui_js__WEBPACK_IMPORTED_MODULE_0__);\n\n\n(0,_ui_js__WEBPACK_IMPORTED_MODULE_0__.loadUI)();\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/mainGame.js":
/*!*************************!*\
  !*** ./src/mainGame.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// import modules\nconst player = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n\n// main game loop\n// 1. create players\nfunction mainGame() {\n    let human = player();\n    let enemy = player();\n    let turn = 0;\n\n    // playRound function\n    // play round: recieve human choice, if square hit: true return, if not, human.attack, computer.randomAttack\n    function playRound(humanChoice) {\n        // check if gameOver is true\n        if (human.ownBoard.allSunk() || enemy.enemyBoard.allSunk()) {\n            return;\n        }\n        if (enemy.enemyBoard.isHit(humanChoice))\n            return;\n        human.attack(humanChoice, enemy);\n        enemy.randomAttack(human);\n    }\n\n    // get human and get enemy\n    function getHuman() {\n        return human;\n    }\n\n    function getEnemy() {\n        return enemy;\n    }\n\n    // restart game\n    function restartGame() {\n        human.ownBoard.resetBoard();\n        enemy.enemyBoard.resetBoard();\n        turn = 0;\n    };\n\n    // return functions\n    return {\n        playRound,\n        getHuman,\n        getEnemy,\n        restartGame\n    }\n}\n\nmodule.exports = mainGame;\n\n\n\n//# sourceURL=webpack://battleship/./src/mainGame.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const gameboard = __webpack_require__(/*! ./factories/gameboard */ \"./src/factories/gameboard.js\");\n\nfunction Player() {\n    const ownBoard = gameboard();\n    const enemyBoard = gameboard();\n\n    function attack(x, y, enemyBoard) {\n        return enemyBoard.receiveAttack(x, y);\n    }\n  \n    function randomAttack(pToAttack) {\n      let x = Math.floor(Math.random() * 10);\n      let y = Math.floor(Math.random() * 10);\n      while (missedAttacks.has(`${x},${y}`)) {\n        x = Math.floor(Math.random() * 10);\n        y = Math.floor(Math.random() * 10);\n      }\n      return [x, y];\n    }\n\n    // place ships randomly - within bounds and not overlapping using isValidPlacement function\n    function placeShipsRandomly() {\n        ownBoard.ships.forEach(ship => {\n            let x = Math.floor(Math.random() * 10);\n            let y = Math.floor(Math.random() * 10);\n            let isHorizontal = Math.random() < 0.5;\n            while (!ownBoard.isValidPlacement(ship, x, y, isHorizontal)) {\n                x = Math.floor(Math.random() * 10);\n                y = Math.floor(Math.random() * 10);\n                isHorizontal = Math.random() < 0.5;\n            }\n            ownBoard.placeShip(ship, x, y, isHorizontal);\n        });\n    }\n\n\n    return {\n        ownBoard,\n        enemyBoard,\n        attack,\n        randomAttack,\n        placeShipsRandomly\n    };\n\n}\n\nmodule.exports = Player;\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// import\nconst mainGame = __webpack_require__(/*! ./mainGame.js */ \"./src/mainGame.js\");\nconst ship = __webpack_require__(/*! ./factories/ship.js */ \"./src/factories/ship.js\");\n\n// create the UI fully through JS\n// initially \nfunction loadUI() {\n    const header = createHeader();\n    const main = createMain();\n    const footer = createFooter();\n\n    document.body.appendChild(header, main, footer);\n\n    shipPlacementPopUp();\n}\n\n// create the header\nfunction createHeader() {\n    const header = document.createElement('header');\n    const title = document.createElement('h1');\n\n    title.textContent = 'Battleship';\n    header.appendChild(title);\n    return header;\n}\n\n// create the main\nfunction createMain() {\n    const main = document.createElement('main');\n    main.classList.add('main');\n\n    // create the game board\n    const humanBoard = createInitialBoard();\n    const enemyBoard = createInitialBoard();\n\n    humanBoard.classList.add('human');\n    computerBoard.classList.add('computer');\n    computerBoard.classList.add('interact');\n\n    // make boards interactable to attack\n    makeAttackable(humanBoard, enemyBoard);\n\n    main.appendChild(humanBoard, enemyBoard);\n    return main;\n}\n\nfunction createInitialBoard() {\n    let board = document.createElement(\"div\");\n    board.classList.add(\"board\");\n    \n    for (let x = 0; x < 10; ++x) {\n        let boardRow = document.createElement(\"div\");\n        boardRow.classList.add(\"board-row\");\n\n        for (let y = 0; y < 10; ++y) {\n            let square = document.createElement(\"div\");\n            square.classList.add(\"board-square\");\n            boardRow.appendChild(square);\n        }\n        board.appendChild(boardRow);\n    }\n    return board;\n}\n\n// make both boards interactable to attack - By clicking on the computer board\n// play round with coordinates of clicked square - then update both boards with new round info\n// last check if game over - if so, trigger loadGameOverPopup()\nfunction makeAttackable(enemyBoard, humanBoard) {\n    const enemyBoardRows = enemyBoard.childNodes;\n    for (let x = 0; x < 10; ++x) {\n        const boardSquares = enemyBoardRows[x].childNodes;\n        for (let y = 0; y < 10; ++y) {\n            boardSquares[y].addEventListener('click', () => {\n                game.playRound([x, y]);\n                renderBoard(game.getEnemy().enemyBoard, enemyBoard);\n                renderBoard(game.getHuman().ownBoard, humanBoard);\n\n                if (game.hasGameFinished())\n                gameEndingPopUp();\n            });\n        }\n    }\n}\n\n// renderBoard\n// \nfunction renderBoard(boardToRender, boardOnScreen) {\n    const boardRows = boardOnScreen.childNodes;\n    for (let x = 0; x < 10; ++x) {\n        const boardSquares = boardRows[x].childNodes;\n        for (let y = 0; y < 10; ++y) {\n            const square = boardSquares[y];\n            const squareInfo = boardToRender.getSquareInfo(x, y);\n\n            if (squareInfo.isHit) {\n                square.classList.add('hit');\n            } else if (squareInfo.isMissed) {\n                square.classList.add('missed');\n            }\n        }\n    }\n}\n\nfunction shipPlacementPopUp() {\n    const background = document.createElement(\"div\");\n    background.classList.add(\"overlay\");\n\n    const popUp = document.createElement(\"div\");\n    popUp.classList.add(\"popUp\");\n\n    const heading = document.createElement(\"h2\");\n    heading.textContent = \"Welcome to the battleship game\";\n\n    const info = document.createElement(\"span\");\n    info.textContent = \"Place your ships\";\n\n    const rotateButton = document.createElement(\"button\");\n    rotateButton.addEventListener('click', () => {\n        isHorizontal = !isHorizontal;\n    });\n    rotateButton.textContent = \"Rotate\";\n\n    const userBoard = createInitialBoard();\n    userBoard.classList.add(\"interactible\");\n    let isHorizontal = true;\n    let current = 0;\n    const shipLengths = [5, 4, 3, 3, 2];\n\n    const boardRows = userBoard.childNodes;\n    const board = game.getUser().ownGameboard;\n    for (let x = 0; x < 10; ++x) {\n        const boardSquares = boardRows[x].childNodes;\n        for (let y = 0; y < 10; ++y) {\n            boardSquares[y].addEventListener('click', () => {\n                if (board.isOutOfBounds([x, y], shipLengths[current], isHorizontal) || board.willCollide([x, y], shipLengths[current], isHorizontal))\n                    return ;\n                board.placeShip([x, y], shipLengths[current], isHorizontal);\n                renderBoard(board, userBoard);\n\n                if (current++ == 4) {\n                    const boardOnScreen = document.querySelector(\".user\");\n                    renderBoard(board, boardOnScreen);\n                    background.remove();\n                }\n            });\n        }\n    }\n\n    game.getEnemy().placeShipsRandomly();\n\n    popUp.append(heading, info, rotateButton, userBoard);\n    background.appendChild(popUp);\n\n    document.body.appendChild(background);\n}\n\n// create the footer\nfunction createFooter() {\n    const footer = document.createElement('footer');\n    const startButton = document.createElement('button');\n\n    startButton.textContent = 'Start Game';\n    footer.appendChild(startButton);\n    return footer;\n}\n\nfunction gameEndingPopUp() {\n    const popUp = document.createElement('div');\n    const popUpText = document.createElement('p');\n    const popUpButton = document.createElement('button');\n\n    popUp.classList.add('pop-up');\n    popUpText.classList.add('pop-up-text');\n    popUpButton.classList.add('pop-up-button');\n\n    popUpText.textContent = 'Game Over';\n    popUpButton.textContent = 'Play Again';\n\n    popUp.appendChild(popUpText, popUpButton);\n    document.body.appendChild(popUp);\n\n    popUpButton.addEventListener('click', () => {\n        document.body.removeChild(popUp);\n        mainGame();\n    });\n}\n\n\n\nmodule.exports = loadUI;\n\n//# sourceURL=webpack://battleship/./src/ui.js?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
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