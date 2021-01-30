'use strict';
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

//Player stuff
//EX player: {position: {x: 12, room: 1}, name: "Bob", avatar: 3}
var players = new Map();


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
        let p = players.get(socket.id);
        if (p != undefined) {
            players.delete(socket.id);
            console.log(p.name + " has left the game!");
            socket.broadcast.emit("player_left", socket.id);
        }
    });

    socket.on('join', (info) => {
        let previousP = players.get(socket.id);
        if (previousP != undefined) {

        }
        console.log(info.name + " has joined the game as avatar " + info.avatar);

        let p = {
            position: { x: 5, room: 1 },
            name: info.name,
            avatar: info.avatar
        };

        players.set(socket.id, p);
    });

    socket.on('update_pos', (position) => {
        let p = players.get(socket.id);
        if (p != undefined) {
            p.position = position;
            socket.broadcast.emit("player_pos", { id: socket.id, player: p });
        }
    });

    socket.on('chat_send', (message) => {
        console.log(message);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});