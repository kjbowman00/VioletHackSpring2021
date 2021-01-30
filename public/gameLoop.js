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
	let playerSpeed = 500;
	player.x += getDirectionMultiplier() * deltaTime * playerSpeed;
}

function draw() {
	var ctx = canvas.getContext('2d');
	ctx.drawImage(backgroundImage, 0, 0, backgroundImage.width, backgroundImage.height, 0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "black";
	ctx.fillRect(player.x, canvas.height - 150, 100, 100);
}

function gameLoop(timestamp) {
	deltaTime = (timestamp - lastUpdateTime) / 1000;
	lastUpdateTime = timestamp;
	update();
	draw();
	requestAnimationFrame(gameLoop);
}