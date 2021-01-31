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

var player = { position: { x: 3, room: 1 }, avatarNum: 1, frame: 1, name:"eee"};
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

const frameTimer = 0.25;
var lastFrameChange = 0;
function update() {
	let playerSpeed = 100;
	player.position.x += getDirectionMultiplier() * deltaTime * playerSpeed;
	if (getDirectionMultiplier() != 0) {
		lastFrameChange += deltaTime;
		//console.log(deltaTime);
		if (lastFrameChange >= frameTimer) {
			player.frame += 1;
			if (player.frame == 3) player.frame = 1;
			lastFrameChange = 0;
		}
	}
	else {
		lastFrameChange = 0;
	}
	if (player.position.x < 0) player.position.x += backgroundImage.width;
	if (player.position.x > backgroundImage.width) player.position.x -= backgroundImage.width;

	for (let i = selfChatMessages.length - 1; i >= 0; i--) {
		let element = selfChatMessages[i];
		element.timeLeft -= deltaTime;
		if (element.timeLeft <= 0) {
			selfChatMessages.splice(i, 1); //Remove element
		}
	}
	for (let i = chatMessages.length - 1; i >= 0; i--) {
		let element = chatMessages[i];
		element.timeLeft -= deltaTime;
		if (element.timeLeft <= 0) {
			chatMessages.splice(i, 1); //Remove element
		}
	}
}

//Function for wrapping the paragraph comes from NISHIO Hirokazu on codepen
function drawParagraphText(ctx, message, x, y, width) {
	ctx.textAlign = "left";
	ctx.font = "bold 15px Courier New";
	ctx.fillStyle = "black";
	let words = message.split(' ');
	let currLine = '';

	for (let i = 0; i < words.length; i++) {
		let nextLine = currLine + words[i] + ' ';
		let metrics = ctx.measureText(nextLine);
		let testWidth = metrics.width;
		if (testWidth > width && i > 0) {
			ctx.fillText(currLine, x, y);
			currLine = words[i] + ' ';
			y += 15;
		}
		else {
			currLine = nextLine;
		}
		ctx.fillText(currLine, x, y);
	}
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

	 for (let i = selfChatMessages.length - 1; i >= 0; i--) {
	 	let textBoxWidth = 400;
	 	ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
	 	ctx.fillRect(canvas.width / 2 - textBoxWidth / 2 - 10, canvas.height - 300 - 25, textBoxWidth, 100);
	 	drawParagraphText(ctx, selfChatMessages[i].message, canvas.width / 2 - textBoxWidth/2, canvas.height - 300, textBoxWidth);
	 }

	ctx.save();
	if (playerDirection == 1){
		ctx.translate(75, 0);
		ctx.scale(-1,1);
	}
	ctx.drawImage(playerImages[avatarNum - 1][player.frame - 1], 0, 0, 150, 300, (canvas.width / 2 - 75) * playerDirection*-1, canvas.height - 180, 75, 150);
	ctx.restore();	


	let maxTextWidth = player.name.length * 20;
	ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
	//ctx.fillRect(canvas.width / 2 - 37.5 - maxTextWidth / 2, canvas.height - 275, maxTextWidth, 22);
	ctx.fillRect(canvas.width / 2 - 37.5 - maxTextWidth / 2, canvas.height - 219, maxTextWidth, 22);
	// klaras attempt :(
	//ctx.fillRect(canvas.width / 2 - maxTextWidth / 2 + 2, canvas.height - 275, maxTextWidth, 22);

	ctx.fillStyle = "black";
	ctx.font = "20px Courier New";
	ctx.textAlign = "center";
	ctx.fillText(player.name, canvas.width / 2 - 37.5, canvas.height - 200);
	// klaras attempt :(
	//ctx.fillText(player.name, canvas.width/ 2 + 2, canvas.height - 258);

	for (const element of otherPlayers) {
		let p = element[1];
		maxTextWidth = p.name.length * 20;
		ctx.drawImage(playerImages[p.avatarNum - 1][p.frame-1], 0, 0, 150, 300, canvas.width / 2 - 50 - (player.position.x - p.position.x) * scale, canvas.height - 180, 75, 150);
		ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
		ctx.fillRect(canvas.width / 2 - (player.position.x - p.position.x) * scale - maxTextWidth / 2, canvas.height - 219, maxTextWidth, 22);
		ctx.fillStyle = "black";
		ctx.font = "20px Courier New";
		ctx.textAlign = "center";
		ctx.fillText(p.name, canvas.width / 2 - (player.position.x - p.position.x) * scale, canvas.height - 200);

		ctx.drawImage(playerImages[p.avatarNum - 1][p.frame - 1], 0, 0, 150, 300, canvas.width / 2 - 50 - (player.position.x - p.position.x - backgroundImage.width) * scale, canvas.height - 180, 75, 150);
		ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
		ctx.fillRect(canvas.width / 2 - (player.position.x - p.position.x - backgroundImage.width) * scale - maxTextWidth / 2, canvas.height - 219, maxTextWidth, 22);
		ctx.fillStyle = "black";
		ctx.font = "20px Courier New";
		ctx.textAlign = "center";
		ctx.fillText(p.name, canvas.width / 2 - (player.position.x - p.position.x - backgroundImage.width) * scale, canvas.height - 200);

		ctx.drawImage(playerImages[p.avatarNum - 1][p.frame - 1], 0, 0, 150, 300, canvas.width / 2 - 50 - (player.position.x - p.position.x + backgroundImage.width) * scale, canvas.height - 180, 75, 150);
		ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
		ctx.fillRect(canvas.width / 2 - (player.position.x - p.position.x + backgroundImage.width) * scale - maxTextWidth / 2, canvas.height - 219, maxTextWidth, 22);
		ctx.fillStyle = "black";
		ctx.font = "20px Courier New";
		ctx.textAlign = "center";
		ctx.fillText(p.name, canvas.width / 2 - (player.position.x - p.position.x + backgroundImage.width) * scale, canvas.height - 200);
	}

	for (let i = chatMessages.length - 1; i >= 0; i--) {
		let p = otherPlayers.get(chatMessages[i].id);
		if (p != undefined) {
			let textBoxWidth = 400;
			ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
			ctx.fillRect(canvas.width / 2 - (player.position.x - p.position.x) * scale - textBoxWidth / 2 - 10, canvas.height - 300 - 25, textBoxWidth, 100);
			drawParagraphText(ctx, chatMessages[i].message, canvas.width / 2 - (player.position.x - p.position.x) * scale - textBoxWidth / 2 , canvas.height - 300, textBoxWidth);

			ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
			ctx.fillRect(canvas.width / 2 - (player.position.x - p.position.x - backgroundImage.width) * scale - textBoxWidth / 2 - 10, canvas.height - 300 - 25, textBoxWidth, 100);
			drawParagraphText(ctx, chatMessages[i].message, canvas.width / 2 - (player.position.x - p.position.x - backgroundImage.width) * scale - textBoxWidth / 2, canvas.height - 300, textBoxWidth);

			ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
			ctx.fillRect(canvas.width / 2 - (player.position.x - p.position.x + backgroundImage.width) * scale - textBoxWidth / 2 - 10, canvas.height - 300 - 25, textBoxWidth, 100);
			drawParagraphText(ctx, chatMessages[i].message, canvas.width / 2 - (player.position.x - p.position.x + backgroundImage.width) * scale - textBoxWidth / 2, canvas.height - 300, textBoxWidth);
		}
	}
}
function gameLoop(timestamp) {
	deltaTime = (timestamp - lastUpdateTime) / 1000;
	lastUpdateTime = timestamp;
	timeSinceLastSendUpdate += deltaTime;
	if (timeSinceLastSendUpdate > 0.05) {
		sendUpdates(player);
		timeSinceLastSendUpdate = 0;
	}
	update();
	draw();
	requestAnimationFrame(gameLoop);
}