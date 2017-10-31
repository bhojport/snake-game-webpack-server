var df = require('../engine/definitions.js');
var sp = require('../playground/snake-parts.js');
(function(){
    // Move the Snake to downwards
    let moveDown = function(){
        if((df.snakeOffsetTop + df.wallOffsetTop) > (df.wallOffsetTop + df.wall.offsetHeight - df.snakeHeight * 2)){
            df.initStatus = "ended";
            return false;
        }
        df.snakeOffsetTop += df.snakeHeight;
        df.snake.style.top = df.snakeOffsetTop + "px";
        let oldTop = [];
        let oldLeft = [];
        for(let i = 0; i < sp.snakeParts.length; i++){
            oldTop.push(sp.snakeParts[i].style.top);
            oldLeft.push(sp.snakeParts[i].style.left);
            if(i === 0){
                sp.snakeParts[i].style.top = (df.snakeOffsetTop - (df.snakeHeight * i) - df.snakeHeight) + "px";
                sp.snakeParts[i].style.left = df.snakeOffsetLeft + "px";
            } else {
                sp.snakeParts[i].style.top = oldTop[i-1];
                sp.snakeParts[i].style.left = oldLeft[i-1];
            }
        }
    };

    module.exports = {
        moveDown
    };
})();