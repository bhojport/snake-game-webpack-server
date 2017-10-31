;(function(){
// Object Varialbes
let wall = document.getElementById("wall");
let snake = document.getElementById("snake");
let food = document.getElementById("food");
let bonusFood = document.getElementById("bonus-food");
let messageHolder = document.getElementById("message-block");
let scoreHolder = document.getElementById("score");
let highScoreHolder = document.getElementById("high-score");
// Score Variables
let points = 0;
let highScore = 0;
// Object Dimensions
let wallWidth = wall.offsetWidth;
let wallHeight = wall.offsetHeight;
let snakeWidth = snake.offsetWidth;
let snakeHeight = snake.offsetHeight;
let foodWidth = food.offsetWidth;
let foodHeight = food.offsetHeight;
let bonusFoodWidth = bonusFood.offsetWidth;
let bonusFoodHeight = bonusFood.offsetHeight;
// Object Offsets
let wallOffsetTop = wall.offsetTop;
let wallOffsetLeft = wall.offsetLeft;
let snakeOffsetTop = snake.offsetTop;
let snakeOffsetLeft = snake.offsetLeft;
let foodOffsetTop = food.offsetTop;
let foodOffsetLeft = food.offsetLeft;
let bonusFoodOffsetTop = bonusFood.offsetTop;
let bonusFoodOffsetLeft = bonusFood.offsetLeft;
// Intervals and Storable Variables
let playInterval,
    eatInterval,
    moveInterval,
    bonusInterval,
    snakeFront,
    keyPressed,
    initStatus,
    messageText;
// Constant Variables
const moveSpeed = 100;
const plusPoint = 5;
const plusPointBonus = 500;
const bonusFoodDisappearTime = 5000;


module.exports = {
    wall,
    snake,
    food,
    bonusFood,
    messageHolder,
    scoreHolder,
    highScoreHolder,
    points,
    highScore,
    wallWidth,
    wallHeight,
    snakeWidth,
    snakeHeight,
    foodWidth,
    foodHeight,
    bonusFoodWidth,
    bonusFoodHeight,
    wallOffsetTop,
    wallOffsetLeft,
    snakeOffsetTop,
    snakeOffsetLeft,
    foodOffsetTop,
    foodOffsetLeft,
    bonusFoodOffsetTop,
    bonusFoodOffsetLeft,
    playInterval,
    eatInterval,
    moveInterval,
    bonusInterval,
    snakeFront,
    keyPressed,
    initStatus,
    messageText,
    moveSpeed,
    plusPoint,
    plusPointBonus,
    bonusFoodDisappearTime
};
})();
