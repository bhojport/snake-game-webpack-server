var df = require('../engine/definitions.js');
(function(){
    // Create Bonus Food for the Snake
    let createBonusFood = function(){
        df.bonusFoodOffsetTop = Math.floor(Math.random() * (df.wallHeight / df.bonusFoodHeight)) * df.bonusFoodWidth;
        df.bonusFoodOffsetLeft = Math.floor(Math.random() * (df.wallWidth / df.bonusFoodWidth)) * df.bonusFoodHeight;
        df.bonusFood.style.top = df.bonusFoodOffsetTop + "px";
        df.bonusFood.style.left = df.bonusFoodOffsetLeft + "px";
        setTimeout(hideBonusFood,df.bonusFoodDisappearTime); // Hide Bonus Food after 5000ms
    };
    // Hide Bonus Food
    let hideBonusFood = function(){
        df.bonusFood.style.top = "-1000px";
        df.bonusFood.style.left = "-1000px";
    };
    // Bonus Food Appearance Time (Random)
    let randomTime = [5000, 10000, 15000, 20000];
    module.exports = {
        createBonusFood,
        hideBonusFood,
        randomTime
    };
})();
