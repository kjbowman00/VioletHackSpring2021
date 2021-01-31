"use strict";
var socket = io();

var otherPlayers = new Map();

function joinGame() {
	document.getElementById("main_menu_box").style.display = "none";
	document.getElementById("game_box").style.display = "block";

	requestAnimationFrame(gameLoop);

	let name = document.getElementById("username").value;
	player.name = name;
	console.log(name);

	socket.emit("join", { name: name, avatarNum: avatarNum, frame:1 });
}

function sendUpdates(position) {
	socket.emit("update_pos", position);
}

socket.on("player_pos", (obj) => {
	let p = otherPlayers.get(obj.id);
	if (p == undefined) {
		otherPlayers.set(obj.id, obj.player);
	}
	else {
		p.position = obj.player.position;
	}
});
socket.on("player_left", (obj) => {
	otherPlayers.delete(obj);
});

var selfChatMessages = [];
function sendChat(message) {
	socket.emit("chat_message", message);
	selfChatMessages.push({ message:message, timeLeft: 5 });
}


var chatMessages = [];
socket.on("chat_message", (obj) => {
	//Create text box above that particular player
	chatMessages.push({id: obj.id, message:obj.message, timeLeft: 5});
});

function getPlayers() {

}