"use strict";
var socket = io();

function joinGame() {
	console.log("weewoo");
	socket.emit("join", { name: "bob", avatar: 1 });
}