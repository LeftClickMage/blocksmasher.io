


var createError = require('http-errors');
var express = require('express');
var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

const http = require('http');

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// app.use(express.static(path.join(__dirname,'..', '/')));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/arena.html');
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


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
