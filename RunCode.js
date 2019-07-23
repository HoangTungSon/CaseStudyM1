let gameBoard = new GameBoard();

window.addEventListener("keydown", function () {
    gameBoard.controller.keyListener(event);
});
window.addEventListener("keyup", function () {
    gameBoard.controller.keyListener(event);
});
let animation = window.requestAnimationFrame(function () {
    gameBoard.map.mapping(gameBoard.context);
    gameBoard.checkCondition();
});