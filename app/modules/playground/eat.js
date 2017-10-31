var df = require('../engine/definitions.js');
var sp = require('./snake-parts.js');
var f = require('./food.js');
var bf = require('./bonus-food.js');
(function(){
    // Have the Food if Snake cross the food
    /*
        Object corner points (numbering) for collision detection
        1                        2
        +------------------------+
        |                        |
        |                        |
        |                        |
        |                        |
        +------------------------+
        4                        3
    */
    df.eatInterval = setInterval(function(){
        let s1x = df.snakeOffsetLeft;
        let s2x = df.snakeOffsetLeft + df.snakeWidth;
        let f1x = df.foodOffsetLeft;
        let f2x = df.foodOffsetLeft + df.foodWidth;
        let s1y = df.snakeOffsetTop;
        let s4y = df.snakeOffsetTop + df.snakeHeight;
        let f1y = df.foodOffsetTop;
        let f4y = df.foodOffsetTop + df.foodHeight;
        let bf1x = df.bonusFoodOffsetLeft;
        let bf2x = df.bonusFoodOffsetLeft + df.bonusFoodWidth;
        let bf1y = df.bonusFoodOffsetTop;
        let bf4y = df.bonusFoodOffsetTop + df.bonusFoodHeight;
        if((s1x < f2x) && (s2x > f1x) && (s1y < f4y) && s4y > f1y){
            df.points += df.plusPoint;
            f.createFood();
            df.scoreHolder.innerHTML = df.points;
            sp.createSnakeParts();
        }
        if((s1x < bf2x) && (s2x > bf1x) && (s1y < bf4y) && (s4y > bf1y)){
            df.points += df.plusPointBonus;
            df.scoreHolder.innerHTML = df.points;
            bf.hideBonusFood();
        }
        let oldTop = [];
        let oldLeft = [];
        for(let i = 0; i < sp.snakeParts.length; i++){
            oldTop.push(sp.snakeParts[i].style.top);
            oldLeft.push(sp.snakeParts[i].style.left);
            let baby1x = [];
            let baby2x = [];
            let baby1y = [];
            let baby4y = [];
            baby1x[i] = sp.snakeParts[i].offsetLeft;
            baby2x[i] = sp.snakeParts[i].offsetLeft + df.snakeWidth;
            baby1y[i] = sp.snakeParts[i].offsetTop;
            baby4y[i] = sp.snakeParts[i].offsetTop + df.snakeHeight;
            if((s1x < baby2x[i]) && (s2x > baby1x[i]) && (s1y < baby4y[i]) && (s4y > baby1y[i])){			
                df.initStatus = "ended";
                df.playInterval && clearInterval(df.playInterval);
            }
            if(i%2 === 0){
                sp.snakeParts[i].style.backgroundColor = "#f00";
            }
        }
    }, 100);
})();
