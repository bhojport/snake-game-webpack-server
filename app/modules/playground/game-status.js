var df = require('../engine/definitions.js');
var m = require('./message.js');
var bf = require('./bonus-food.js');
(function(){
    // Game Status: Start / End
    let gameStatus = function(){
        if(df.initStatus === "started"){
            m.hideMessage();
        }
        if(df.initStatus === "ended"){
            clearInterval(df.moveInterval);
            clearInterval(df.bonusInterval);
            bf.hideBonusFood();
            df.messageText = "Game Over!";
            if(df.points > df.highScore){
                df.messageText = "You got a high score!";
                df.highScore = df.points;
                df.highScoreHolder.textContent = df.highScore;
            }
            m.showMessage();
        }
    };

    module.exports = {
        gameStatus
    };
})();
