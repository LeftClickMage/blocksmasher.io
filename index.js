
const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bcrypt = require ('bcrypt');
const saltRounds = 10;


var user;
var passwordInput;
// app.use(express.static(path.join(name, 'static')));








//WRITE

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("smasher");
//   var myobj = { username: "DEEZ", password: "NUTS" };
//   dbo.collection("data").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("Inserted");
//     db.close();
//   });
// });

//READ

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("smasher");
//   var query = { username: "DEEZ" };
//   dbo.collection("data").find(query).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result[0].username + ": " + result[0].password);
//     db.close();
//   });
// });

//DELETE

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("smasher");
//   var myquery = { username: 'DEEZ' };
//   dbo.collection("data").deleteOne(myquery, function(err, obj) {
//     if (err) throw err;
//     console.log("1 document deleted");
//     db.close();
//   });
// });


//UPDATE
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("smasher");
//   var myquery = { username: "LCM" };
//   var newvalues = { $set: {username: "DEEZ", password: "CUPS" } };
//   dbo.collection("data").updateOne(myquery, newvalues, function(err, res) {
//     if (err) throw err;
//     console.log("1 document updated");
//     db.close();
//   });
// });


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/arena.html');
});




io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log("disconnected");
  });
  socket.on('move', (msg, val, val2, valR, atk) => {
    io.emit('move', msg, val, val2, valR, atk);
  });
  socket.on('update', (user, msg) => {
    io.emit('update', user, msg);
  });
  socket.on('spawn player', (msg) => {
    io.emit('spawn player', msg);
  });
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});











const mongo = require('mongodb');
const password = encodeURIComponent("<prog></>");
var url = "mongodb+srv://LeftClickMage:"+ password +"@smasher-data.pecxd.mongodb.net/?retryWrites=true&w=majority";
var MongoClient = require('mongodb').MongoClient;


var dbo;

MongoClient.connect(url, function(err, db){
  if(err) {
    return console.log(err);
  }
  dbo = db.db("smasher");
  // start the express web server listening on 8080

});



app.use(express.json());
app.use(express.urlencoded());

app.post('/login', (req, res) => {

  var query = { username: req.body.username };
  
  dbo.collection("data").find(query).toArray(function(err, result) {
    if(result.length == 0){
      bcrypt.genSalt(saltRounds, function(err, salt) {  
        bcrypt.hash(req.body.password, salt, function(err, hash) {

          var myobj = { username: req.body.username, password: hash };
          dbo.collection("data").insertOne(myobj, function(err, res) {});
        });
      });
      
    }
    res.send(result);

  });
    
});
app.get('/login', (req, res) => {
  var logged = false;
  console.log(logged);
  dbo.collection("data").find({}).toArray(function(err, result) {
    if (err) throw err;
    var data = result;
    
    for (let i = 0; i<data.length; i++){
      if(data[i]["username"]==user){
logged = true;
      }
    }
    for (let i = 0; i<data.length; i++){
      if(data[i]["username"]==user){
        console.log(data[i]["password"]);
        console.log(passwordInput);
        bcrypt.compare(passwordInput, data[i]["password"], function(err, result) {
          if (result) {
            res.send(true);
            return;
            } else {
              res.send(false);
              return;
            }
            
        });

      }
      
    }
    
       if(logged == false){
        res.send(false);
       }       
            
            
  });
  
    
  
});



app.post('/userpost', (req,res) =>{
  user = req.body.user;
  
});
app.post('/passpost', (req,res) =>{
  passwordInput = req.body.pass;
  
});