var df = require('../engine/definitions.js');

(function(){
    // Create Snake Body Parts
    let createSnakeParts = function(){
        let snakeBody = document.createElement("div");
        snakeBody.className = "snake-body";
        df.wall.insertBefore(snakeBody, df.snake);
    };
    // Snake Body Element
    let snakeParts = document.getElementsByClassName("snake-body");
    module.exports = {
        snakeParts,
        createSnakeParts
    }
})();
