var df = require('../engine/definitions.js');
var sp = require('./snake-parts.js');
(function(){
    // Move the Snake to Leftwards
    let moveLeft = function(){
        if((df.snakeOffsetLeft+df.wallOffsetLeft) <= (df.wallOffsetLeft)){
            df.initStatus = "ended";
            return false;
        }
        df.snakeOffsetLeft -= df.snakeHeight;
        df.snake.style.left = df.snakeOffsetLeft + "px";
        let oldTop = [];
        let oldLeft = [];
        for(let i = 0; i < sp.snakeParts.length; i++){
            oldTop.push(sp.snakeParts[i].style.top);
            oldLeft.push(sp.snakeParts[i].style.left);
            if(i === 0){
                sp.snakeParts[i].style.top = df.snakeOffsetTop + "px";
                sp.snakeParts[i].style.left = (df.snakeOffsetLeft + (df.snakeWidth * i) + df.snakeWidth) + "px";
            } else {
                sp.snakeParts[i].style.top = oldTop[i-1];
                sp.snakeParts[i].style.left = oldLeft[i-1];
            }
        }
    };

    module.exports = {
        moveLeft
    };
})();
