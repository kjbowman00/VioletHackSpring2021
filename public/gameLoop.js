"use strict";
var canvas = document.getElementById("game_canvas");
//Setup canvas
canvas.width = window.innerWidth;
console.log(canvas.width);
console.log(window.innerWidth);
canvas.height = window.innerHeight;

var lastUpdateTime = 0;
var deltaTime = 0;
var timeSinceLastSendUpdate = 0;

var player = { position: { x: 3, room: 1 }, avatar: 1};
var backgroundImage = new Image(115, 50);
backgroundImage.src = "/backgrounds/background1.png";

function update() {
	let playerSpeed = 500;
	player.position.x += getDirectionMultiplier() * deltaTime * playerSpeed;
}

function draw() {
	var ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;
	ctx.drawImage(backgroundImage, 0, 0, backgroundImage.width, backgroundImage.height, 0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "black";
	ctx.fillRect(player.position.x, canvas.height - 150, 100, 100);

	for (const element of otherPlayers) {
		let p = element[1];
		ctx.fillStyle = "black";
		ctx.fillRect(p.position.x, canvas.height - 150, 100, 100);
	}
}
function gameLoop(timestamp) {
	deltaTime = (timestamp - lastUpdateTime) / 1000;
	lastUpdateTime = timestamp;
	timeSinceLastSendUpdate += deltaTime;
	if (timeSinceLastSendUpdate > 0.05) {
		sendUpdates(player.position);
		timeSinceLastSendUpdate = 0;
	}
	update();
	draw();
	requestAnimationFrame(gameLoop);
}