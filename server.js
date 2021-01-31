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
        console.log(info.name + " has joined the game as avatar " + info.avatarNum);

        let p = {
            position: { x: 5, room: 1 },
            name: info.name,
            avatarNum: info.avatarNum,
            frame: info.frame
        };

        players.set(socket.id, p);
    });

    socket.on('update_pos', (obj) => {
        let p = players.get(socket.id);
        if (p != undefined) {
            p.position = obj.position;
            p.frame = obj.frame;
            socket.broadcast.emit("player_pos", { id: socket.id, player: p });
        }
    });

    socket.on('chat_message', (message) => {
        console.log(message);
        socket.broadcast.emit("chat_message", { id: socket.id, message: message });
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});