var df = require('../engine/definitions.js');
var gs = require('../playground/game-status.js');
var md = require('../playground/move-down.js');
var mr = require('../playground/move-right.js');
var mu = require('../playground/move-up.js');
var ml = require('../playground/move-left.js');
var f = require('../playground/food.js');
(function(){
    "use strict";
    // On User Keypress
    document.onkeydown = function(e){
        e = e || window.event;
        if(typeof df.initStatus === "undefined"){
            df.initStatus = "started";
            df.moveInterval = setInterval(gs.gameStatus, df.moveSpeed); // Start the Game
        }
        if(df.initStatus == "ended"){
            let snakeBody = document.getElementsByClassName("snake-body");
            while(snakeBody[0]){
                snakeBody[0].parentNode.removeChild(snakeBody[0]);
            }
            f.createFood();
            df.snake.style.top = 0;
            df.snake.style.left = 0;
            df.snakeOffsetLeft = df.snakeOffsetTop = 0;
            df.points = 0;
            df.scoreHolder.innerHTML = 0;
            df.keyPressed = null;
            df.snakeFront = null;
            df.initStatus = "started"; // Start the Game
            df.moveInterval = setInterval(gs.gameStatus, df.moveSpeed); // Detect Collision while Moving
        }
        if(df.keyPressed !== e.keyCode){
            switch(e.keyCode){
            case 37:
                // left arrow
                if(df.snakeFront != "right"){
                    df.snakeFront = "left";
                    df.snake.className = "";
                    df.snake.classList.add("snake-front-left");
                    df.playInterval && clearInterval(df.playInterval);
                    df.playInterval = setInterval(ml.moveLeft, df.moveSpeed);	
                }			
                break;
            case 38:
                // up arrow
                if(df.snakeFront != "down"){
                    df.snakeFront = "up";
                    df.snake.className = "";
                    df.snake.classList.add("snake-front-up");
                    df.playInterval && clearInterval(df.playInterval);
                    df.playInterval = setInterval(mu.moveUp,df.moveSpeed);
                }
                break;
            case 39:
                // right arrow
                if(df.snakeFront != "left"){
                    df.snakeFront = "right";
                    df.snake.className = "";
                    df.snake.classList.add("snake-front-right");
                    df.playInterval && clearInterval(df.playInterval);
                    df.playInterval = setInterval(mr.moveRight,df.moveSpeed);	
                }
                break;
            case 40:
                // down arrow
                if(df.snakeFront != "up"){
                    df.snakeFront = "down";
                    df.snake.className = "";
                    df.snake.classList.add("snake-front-down");
                    df.playInterval && clearInterval(df.playInterval);
                    df.playInterval = setInterval(md.moveDown,df.moveSpeed);
                }
                break;
            default:
                df.snakeFront = "down";
                df.snake.className = "";
                df.snake.classList.add("snake-front-down");
                df.playInterval && clearInterval(df.playInterval);
                df.playInterval = setInterval(md.moveDown,df.moveSpeed);
                break;
        }
        }
        df.keyPressed = e.keyCode; // Store the Snake Movement Direction
    };
})();
