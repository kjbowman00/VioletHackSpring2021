'use strict';
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


//Player stuff
//EX player: {position: {x: 12, room: 1}, name: "Bob", avatar: 3}
var players = new Map();



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
        let p = players.get(socket.id);
        if (p != undefined) {
            players.delete(socket.id);
            console.log(p.name + " has left the game!");
        }
    });

    socket.on('join', (info) => {
        console.log(info.name + " has joined the game as avatar " + info.avatar);

        let p = {
            position: { x: 5, room: 1 },
            name: info.name,
            avatar: info.avatar
        };

        players.set(socket.id, p);
    });

    socket.on('update_pos', (position) => {
    });

    socket.on('chat_send', (message) => {
        console.log(message);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});