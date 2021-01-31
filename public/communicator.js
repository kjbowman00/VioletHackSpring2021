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

function sendUpdates(obj) {
	socket.emit("update_pos", obj);
}

socket.on("player_pos", (obj) => {
	let p = otherPlayers.get(obj.id);
	if (p == undefined) {
		otherPlayers.set(obj.id, obj.player);
	}
	else {
		p.position = obj.player.position;
		p.frame = obj.player.frame;
	}
});
socket.on("player_left", (obj) => {
	otherPlayers.delete(obj);
});

var selfChatMessages = [];
function sendChat() {
	let message = document.getElementById("chat_entry").value;
	document.getElementById("chat_entry").value = "";
	socket.emit("chat_message", message);
	selfChatMessages.push({ message:message, timeLeft: 5 });
}


var chatMessages = [];
socket.on("chat_message", (obj) => {
	//Create text box above that particular player
	console.log("YEET");
	chatMessages.push({id: obj.id, message:obj.message, timeLeft: 5});
});

function getPlayers() {

}