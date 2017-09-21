'use strict';

var wall = document.getElementById('wall');
var snake = document.getElementById('snake');
var messageBlock = document.getElementById('message-block');
var scoreBox = document.getElementById('score');

var wallWidth = wall.offsetWidth;
var wallHeight = wall.offsetHeight;
var snakeWidth = snake.offsetWidth;
var snakeHeight = snake.offsetHeight;

var showMessage = function(){
	messageBlock.classList.remove('hide');
};
var hideMessage = function(){
	messageBlock.classList.add('hide');
};

hideMessage();
var playInterval,
	eatInterval;




var wallPosTop = wall.offsetTop;
var wallPosLeft = wall.offsetLeft;
var snakePosTop = snake.offsetTop;
var snakePosLeft = snake.offsetLeft;


// Position food randomly
var food = document.getElementById('food');
var foodWidth = food.offsetWidth;
var foodHeight = food.offsetHeight;
var foodPosTop = food.offsetTop;
var foodPosLeft = food.offsetLeft;

var changeFoodPos = function(){
	foodPosTop = Math.floor(Math.random() * (wallWidth / foodWidth)) * 20;
	foodPosLeft = Math.floor(Math.random() * (wallHeight / foodHeight)) * 20;
	// console.log(Math.floor(Math.random() * (wallHeight - food.offsetHeight)));
	food.style.top = foodPosTop + 'px';
	food.style.left = foodPosLeft + 'px';
	

}
changeFoodPos();
// setInterval(changeFoodPos,100);
var points = 0;
eatInterval = setInterval(function(){
	var s1x = snakePosLeft;
	var s2x = snakePosLeft + snakeWidth;
	var f1x = foodPosLeft;
	var f2x = foodPosLeft + foodWidth;
	var s1y = snakePosTop;
	var s4y = snakePosTop + snakeHeight;
	var f1y = foodPosTop;
	var f4y = foodPosTop + foodHeight;

	if((s1x < f2x) && (s2x > f1x) && (s1y < f4y) && s4y > f1y){
		points += 1;
		changeFoodPos();
		scoreBox.innerHTML = points;
	}

}, 100);


var moveDown = function(){
	if((snakePosTop) > (wallPosTop + wall.offsetHeight - snakeHeight * 2)){
		showMessage();
		return false;
	}
	snakePosTop += snakeHeight;
	snake.style.top = snakePosTop + 'px';
}
var moveRight = function(){
	if((snakePosLeft) > (wallPosLeft + wall.offsetWidth - snakeWidth * 2)){
		showMessage();
		return false;
	}
	snakePosLeft += snakeHeight;
	snake.style.left = snakePosLeft + 'px';
}
var moveUp = function(){
	if(snakePosTop <= wallPosTop){
		showMessage();
		return false;
	}
	snakePosTop -= snakeHeight;
	snake.style.top = snakePosTop + 'px';
}
var moveLeft = function(){
	if((snakePosLeft) <= (wallPosLeft)){
		showMessage();
		return false;
	}
	snakePosLeft -= snakeHeight;
	snake.style.left = snakePosLeft + 'px';
}




	

document.onkeydown = function(e){
	e = e || window.event;
	playInterval && clearInterval(playInterval);
	hideMessage();
	switch(e.keyCode){
		case 37:
			// left arrow

			playInterval = setInterval(moveLeft, 100);
			break;
		case 38:
			// up arrow
			playInterval = setInterval(moveUp,100);
			break;
		case 39:
			// right arrow
			
			playInterval = setInterval(moveRight,100);
			break;
		case 40:
			// down arrow
			playInterval = setInterval(moveDown,100);
			break;
		default:
			playInterval = setInterval(moveDown,100);
			break;
	}
}

