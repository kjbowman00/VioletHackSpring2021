"use strict";
var socket = io();

function joinGame() {
	document.getElementById("main_menu_box").style.display = "none";
	document.getElementById("game_box").style.display = "block";

	requestAnimationFrame(gameLoop);

	socket.emit("join", { name: "bob", avatar: 1 });
}