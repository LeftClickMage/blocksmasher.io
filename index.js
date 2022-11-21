const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.use(express.static(path.join(__dirname,'..', '/')));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/ubuntu-v20-latin-500.eot', (req, res) => {
  res.sendFile(__dirname + '../ubuntu-v20-latin-500.eot');
});
app.get('/ubuntu-v20-latin-500.eot?#iefix', (req, res) => {
  res.sendFile(__dirname + '../ubuntu-v20-latin-500.eot?#iefix');
});
app.get('/ubuntu-v20-latin-500.woff2', (req, res) => {
  res.sendFile(__dirname + '../ubuntu-v20-latin-500.woff2');
});
app.get('/ubuntu-v20-latin-500.woff', (req, res) => {
  res.sendFile(__dirname + '../ubuntu-v20-latin-500.woff');
});

app.get('/ubuntu-v20-latin-500.ttf', (req, res) => {
  res.sendFile(__dirname + '../ubuntu-v20-latin-500.ttf');
});
app.get('/ubuntu-v20-latin-500.svg#Ubuntu', (req, res) => {
  res.sendFile(__dirname + '../ubuntu-v20-latin-500.svg#Ubuntu');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log("disconnected");
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
io.on('connection', (socket) => {
  socket.on('spawn player', (msg) => {
    io.emit('spawn player', msg);
  });
});

io.on('connection', (socket) => {
  socket.on('move', (msg, val, val2, valR, atk) => {
    io.emit('move', msg, val, val2, valR, atk);
  });
});

io.on('connection', (socket) => {
  socket.on('update', (user, msg) => {
    io.emit('update', user, msg);
  });
});
