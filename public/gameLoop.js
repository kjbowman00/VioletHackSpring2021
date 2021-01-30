"use strict";
var canvas = document.getElementById("game_canvas");
//Setup canvas
canvas.width = window.innerWidth;
console.log(canvas.width);
console.log(window.innerWidth);
canvas.height = window.innerHeight;

var lastUpdateTime = 0;
var deltaTime = 0;

var player = {x: 3, room: 1};
var backgroundImage = new Image(800, 400);
backgroundImage.src = "/backgrounds/background1.png";

function update() {
}

function draw() {
	var ctx = canvas.getContext('2d');
	ctx.drawImage(backgroundImage, 0, 0, backgroundImage.width, backgroundImage.height, 0, 0, canvas.width, canvas.height);
}

function gameLoop(timestamp) {
	deltaTime = (timestamp - lastUpdateTime) / 1000;
	lastUpdateTime = timestamp;
	update();
	draw();
	requestAnimationFrame(gameLoop);
}


requestAnimationFrame(gameLoop);