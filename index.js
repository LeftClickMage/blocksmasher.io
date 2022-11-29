
// var jwt = require('jsonwebtoken');
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");

(async () => {
  const client = new DynamoDBClient({ region: "us-west-2" });
  const command = new ListTablesCommand({});
  try {
    const results = await client.send(command);
    console.log(results.TableNames.join("\n"));
  } catch (err) {
    console.error(err);
  }
})();
// app.use(express.static(path.join(__dirname, '/')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/arena.html');
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

