const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
io.on('connection', (socket) => {
    let username;
    socket.on('name', (name) => {
      username = name
      console.log(`${username} connected`)
      io.emit('con/dis', `${username} has entered the chat.`);
    })
    socket.on('chat message', (msg) => {
    io.emit('chat message', `${username}: ${msg}`);
    console.log(`${username}: ${msg}`);
    })
    socket.on('disconnect', () => {
    console.log(`${username} disconnected`);
    io.emit('con/dis', `${username} has left the chat.`);
    });
  });
server.listen(3000, () => {
  console.log('listening on *:3000');
});