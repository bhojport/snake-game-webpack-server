var df = require('../engine/definitions.js');
(function(){
    // Create Food for the Snake
    let foodBG = 0;
    let createFood = function(){
        df.foodOffsetTop = Math.floor(Math.random() * (df.wallHeight / df.foodHeight)) * df.foodWidth;
        df.foodOffsetLeft = Math.floor(Math.random() * (df.wallWidth / df.foodWidth)) * df.foodHeight;
        df.food.style.top = df.foodOffsetTop + "px";
        df.food.style.left = df.foodOffsetLeft + "px";	
        df.food.style.backgroundColor = foodBG % 2 === 0 ? "#666" : "#fff";
        foodBG++;
    };
    createFood(); // Food is created at a random places
    module.exports = {
        createFood
    };
})();
