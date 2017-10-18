/* webpack */
import "../css/game.css";


/*jshint esversion: 6 */
/* jshint expr: true */
(function(){
"use strict";
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
// Show Message on Re-start
let showMessage = function(){
	messageHolder.innerHTML = messageText + "<br /> Press any key to re-start the game!";
	messageHolder.classList.remove("hide");
};
// Hide Message on Start
let hideMessage = function(){
	messageHolder.classList.add("hide");
};
// Create Food for the Snake
let foodBG = 0;
let createFood = function(){
	foodOffsetTop = Math.floor(Math.random() * (wallHeight / foodHeight)) * foodWidth;
	foodOffsetLeft = Math.floor(Math.random() * (wallWidth / foodWidth)) * foodHeight;
	food.style.top = foodOffsetTop + "px";
	food.style.left = foodOffsetLeft + "px";	
	food.style.backgroundColor = foodBG % 2 === 0 ? "#666" : "#fff";
	foodBG++;
};
createFood(); // Food is created at a random places
// Create Bonus Food for the Snake
let createBonusFood = function(){
	bonusFoodOffsetTop = Math.floor(Math.random() * (wallHeight / bonusFoodHeight)) * bonusFoodWidth;
	bonusFoodOffsetLeft = Math.floor(Math.random() * (wallWidth / bonusFoodWidth)) * bonusFoodHeight;
	bonusFood.style.top = bonusFoodOffsetTop + "px";
	bonusFood.style.left = bonusFoodOffsetLeft + "px";
	setTimeout(hideBonusFood,bonusFoodDisappearTime); // Hide Bonus Food after 5000ms
};
// Hide Bonus Food
let hideBonusFood = function(){
	bonusFood.style.top = "-1000px";
	bonusFood.style.left = "-1000px";
};
// Bonus Food Appearance Time (Random)
let randomTime = [5000, 10000, 15000, 20000];
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
eatInterval = setInterval(function(){
	let s1x = snakeOffsetLeft;
	let s2x = snakeOffsetLeft + snakeWidth;
	let f1x = foodOffsetLeft;
	let f2x = foodOffsetLeft + foodWidth;
	let s1y = snakeOffsetTop;
	let s4y = snakeOffsetTop + snakeHeight;
	let f1y = foodOffsetTop;
	let f4y = foodOffsetTop + foodHeight;
	let bf1x = bonusFoodOffsetLeft;
	let bf2x = bonusFoodOffsetLeft + bonusFoodWidth;
	let bf1y = bonusFoodOffsetTop;
	let bf4y = bonusFoodOffsetTop + bonusFoodHeight;
	if((s1x < f2x) && (s2x > f1x) && (s1y < f4y) && s4y > f1y){
		points += plusPoint;
		createFood();
		scoreHolder.innerHTML = points;
		createSnakeParts();
	}
	if((s1x < bf2x) && (s2x > bf1x) && (s1y < bf4y) && (s4y > bf1y)){
		points += plusPointBonus;
		scoreHolder.innerHTML = points;
		hideBonusFood();
	}
	let oldTop = [];
	let oldLeft = [];
	for(let i = 0; i < snakeParts.length; i++){
		oldTop.push(snakeParts[i].style.top);
		oldLeft.push(snakeParts[i].style.left);
		let baby1x = [];
		let baby2x = [];
		let baby1y = [];
		let baby4y = [];
		baby1x[i] = snakeParts[i].offsetLeft;
		baby2x[i] = snakeParts[i].offsetLeft + snakeWidth;
		baby1y[i] = snakeParts[i].offsetTop;
		baby4y[i] = snakeParts[i].offsetTop + snakeHeight;
		if((s1x < baby2x[i]) && (s2x > baby1x[i]) && (s1y < baby4y[i]) && (s4y > baby1y[i])){			
			initStatus = "ended";
			playInterval && clearInterval(playInterval);
		}
		if(i%2 === 0){
			snakeParts[i].style.backgroundColor = "#f00";
		}
	}
}, 100);
// Create Snake Body Parts
let createSnakeParts = function(){
	let snakeBody = document.createElement("div");
	snakeBody.className = "snake-body";
	wall.insertBefore(snakeBody, snake);
};
// Snake Body Element
let snakeParts = document.getElementsByClassName("snake-body");
// Game Status: Start / End
let gameStatus = function(){
	if(initStatus === "started"){
		hideMessage();
	}
	if(initStatus === "ended"){
		clearInterval(moveInterval);
		clearInterval(bonusInterval);
		hideBonusFood();
		messageText = "Game Over!";
		if(points > highScore){
			messageText = "You got a high score!";
			highScore = points;
			highScoreHolder.textContent = highScore;
		}
		showMessage();
	}
};
// Make Bonus Food Appear in Random Interval
bonusInterval = setInterval(createBonusFood,randomTime[Math.floor(Math.random()*randomTime.length)]);
// Move the Snake to downwards
let moveDown = function(){
	if((snakeOffsetTop + wallOffsetTop) > (wallOffsetTop + wall.offsetHeight - snakeHeight * 2)){
		initStatus = "ended";
		return false;
	}
	snakeOffsetTop += snakeHeight;
	snake.style.top = snakeOffsetTop + "px";
	let oldTop = [];
	let oldLeft = [];
	for(let i = 0; i < snakeParts.length; i++){
		oldTop.push(snakeParts[i].style.top);
		oldLeft.push(snakeParts[i].style.left);
		if(i === 0){
			snakeParts[i].style.top = (snakeOffsetTop - (snakeHeight * i) - snakeHeight) + "px";
			snakeParts[i].style.left = snakeOffsetLeft + "px";
		} else {
			snakeParts[i].style.top = oldTop[i-1];
			snakeParts[i].style.left = oldLeft[i-1];
		}
	}
};
// Move the Snake to Rightwards
let moveRight = function(){
	if((snakeOffsetLeft + wallOffsetLeft) > (wallOffsetLeft + wall.offsetWidth - snakeWidth * 2)){
		initStatus = "ended";
		return false;
	}
	snakeOffsetLeft += snakeHeight;
	snake.style.left = snakeOffsetLeft + "px";
	let oldTop = [];
	let oldLeft = [];
	for(let i = 0; i < snakeParts.length; i++){
		oldTop.push(snakeParts[i].style.top);
		oldLeft.push(snakeParts[i].style.left);
		if(i === 0){
			snakeParts[i].style.top = snakeOffsetTop + "px";
			snakeParts[i].style.left = (snakeOffsetLeft - (snakeWidth * i) - snakeWidth) + "px";
		} else {
			snakeParts[i].style.top = oldTop[i-1];
			snakeParts[i].style.left = oldLeft[i-1];
		}
	}
};
// Move the Snake to Upwards
let moveUp = function(){
	if(snakeOffsetTop + wallOffsetTop <= wallOffsetTop){
		initStatus = "ended";
		return false;
	}
	snakeOffsetTop -= snakeHeight;
	snake.style.top = snakeOffsetTop + "px";
	let oldTop = [];
	let oldLeft = [];
	for(let i = 0; i < snakeParts.length; i++){
		oldTop.push(snakeParts[i].style.top);
		oldLeft.push(snakeParts[i].style.left);
		if(i === 0){
			snakeParts[i].style.top = (snakeOffsetTop + (snakeHeight * i) + snakeHeight) + "px";
			snakeParts[i].style.left = snakeOffsetLeft + "px";
		} else {
			snakeParts[i].style.top = oldTop[i-1];
			snakeParts[i].style.left = oldLeft[i-1];
		}
	}
};
// Move the Snake to Leftwards
let moveLeft = function(){
	if((snakeOffsetLeft+wallOffsetLeft) <= (wallOffsetLeft)){
		initStatus = "ended";
		return false;
	}
	snakeOffsetLeft -= snakeHeight;
	snake.style.left = snakeOffsetLeft + "px";
	let oldTop = [];
	let oldLeft = [];
	for(let i = 0; i < snakeParts.length; i++){
		oldTop.push(snakeParts[i].style.top);
		oldLeft.push(snakeParts[i].style.left);
		if(i === 0){
			snakeParts[i].style.top = snakeOffsetTop + "px";
			snakeParts[i].style.left = (snakeOffsetLeft + (snakeWidth * i) + snakeWidth) + "px";
		} else {
			snakeParts[i].style.top = oldTop[i-1];
			snakeParts[i].style.left = oldLeft[i-1];
		}
	}
};
// On User Keypress
document.onkeydown = function(e){
	e = e || window.event;
	if(typeof initStatus === "undefined"){
		initStatus = "started";
		moveInterval = setInterval(gameStatus, moveSpeed); // Start the Game
	}
	if(initStatus == "ended"){
		let snakeBody = document.getElementsByClassName("snake-body");
		while(snakeBody[0]){
			snakeBody[0].parentNode.removeChild(snakeBody[0]);
		}
		createFood();
		snake.style.top = 0;
		snake.style.left = 0;
		snakeOffsetLeft = snakeOffsetTop = 0;
		points = 0;
		scoreHolder.innerHTML = 0;
		keyPressed = null;
		snakeFront = null;
		initStatus = "started"; // Start the Game
		moveInterval = setInterval(gameStatus, moveSpeed); // Detect Collision while Moving
	}
	if(keyPressed !== e.keyCode){
		switch(e.keyCode){
		case 37:
			// left arrow
			if(snakeFront != "right"){
				snakeFront = "left";
				snake.className = "";
				snake.classList.add("snake-front-left");
				playInterval && clearInterval(playInterval);
				playInterval = setInterval(moveLeft, moveSpeed);	
			}			
			break;
		case 38:
			// up arrow
			if(snakeFront != "down"){
				snakeFront = "up";
				snake.className = "";
				snake.classList.add("snake-front-up");
				playInterval && clearInterval(playInterval);
				playInterval = setInterval(moveUp,moveSpeed);
			}
			break;
		case 39:
			// right arrow
			if(snakeFront != "left"){
				snakeFront = "right";
				snake.className = "";
				snake.classList.add("snake-front-right");
				playInterval && clearInterval(playInterval);
				playInterval = setInterval(moveRight,moveSpeed);	
			}
			break;
		case 40:
			// down arrow
			if(snakeFront != "up"){
				snakeFront = "down";
				snake.className = "";
				snake.classList.add("snake-front-down");
				playInterval && clearInterval(playInterval);
				playInterval = setInterval(moveDown,moveSpeed);
			}
			break;
		default:
			snakeFront = "down";
			snake.className = "";
			snake.classList.add("snake-front-down");
			playInterval && clearInterval(playInterval);
			playInterval = setInterval(moveDown,moveSpeed);
			break;
	}
	}
	keyPressed = e.keyCode; // Store the Snake Movement Direction
};
})();