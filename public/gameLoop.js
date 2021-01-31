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

var player = { position: { x: 3, room: 1 }, avatar: 1, frame: 1};
var backgroundImage = new Image(2705, 200);

var playerImages = [];
let img1 = new Image(150, 300);
let img2 = new Image(150, 300);
img1.src = "Avatars/avatar1_1.png";
img2.src = "Avatars/avatar1_2.png";
playerImages.push([img1, img2]);
img1 = new Image(150, 300);
img2 = new Image(150, 300);
img1.src = "Avatars/avatar2_1.png";
img2.src = "Avatars/avatar2_2.png";
playerImages.push([img1, img2]);
img1 = new Image(150, 300);
img2 = new Image(150, 300);
img1.src = "Avatars/avatar3_1.png";
img2.src = "Avatars/avatar3_2.png";
playerImages.push([img1, img2]);
img1 = new Image(150, 300);
img2 = new Image(150, 300);
img1.src = "Avatars/avatar4_1.png";
img2.src = "Avatars/avatar4_2.png";
playerImages.push([img1, img2]);
img1 = new Image(150, 300);
img2 = new Image(150, 300);
img1.src = "Avatars/avatar5_1.png";
img2.src = "Avatars/avatar5_2.png";
playerImages.push([img1, img2]);
img1 = new Image(150, 300);
img2 = new Image(150, 300);
img1.src = "Avatars/avatar6_1.png";
img2.src = "Avatars/avatar6_2.png";
playerImages.push([img1, img2]);


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
	ctx.imageSmoothingEnabled = false;
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

	ctx.drawImage(playerImages[avatarNum - 1][0], 0, 0, 150, 300, canvas.width / 2 - 50, canvas.height - 180, 75, 150);

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