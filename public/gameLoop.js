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
var backgroundImage = new Image(2705, 200);
backgroundImage.src = "/backgrounds/background.png";
var scale = canvas.height / backgroundImage.height;

function update() {
	let playerSpeed = 100;
	player.position.x += getDirectionMultiplier() * deltaTime * playerSpeed;
	if (player.position.x < 0) player.position.x += backgroundImage.width;
	if (player.position.x > backgroundImage.width) player.position.x -= backgroundImage.width;
}

function draw() {
	var ctx = canvas.getContext('2d');
	ctx.drawImage(backgroundImage, player.position.x - canvas.width / 2 / scale, 0, canvas.width / scale, backgroundImage.height,
		0, 0, canvas.width, canvas.height);

	if (player.position.x + canvas.width / 2 / scale < canvas.width / scale) {
		ctx.drawImage(backgroundImage,
			backgroundImage.width - (canvas.width / scale - player.position.x - canvas.width / 2 / scale), 0, canvas.width / scale - player.position.x - canvas.width / 2 / scale, backgroundImage.height,
			0, 0, (canvas.width / scale - player.position.x - canvas.width / 2 / scale) * scale, canvas.height);
	}
	if (player.position.x > backgroundImage.width - canvas.width / scale) {
		ctx.drawImage(backgroundImage,
			0, 0, player.position.x - (backgroundImage.width - canvas.width / scale) - canvas.width/2/scale,backgroundImage.height,
			canvas.width - (player.position.x - (backgroundImage.width - canvas.width / scale) - canvas.width / 2 / scale) * scale, 0, (player.position.x - (backgroundImage.width - canvas.width / scale) - canvas.width / 2 / scale)*scale,canvas.height );
	}

	ctx.fillStyle = "black";
	ctx.fillRect(canvas.width/2-50, canvas.height - 150, 100, 100);

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