var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');


app.use(express.static('app'));
app.use('/', express.static('/'));


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/app/index.html');
});

io.on('connection', function(socket)  {
  console.log('user connected: ' + socket.handshake.address + ' at ' + util.serverDate());
  socket.on('disconnect', function() {
    console.log('user disconnected: ' + socket.handshake.address + ' at ' + util.serverDate());
  });

  socket.on('message', function(msg)  {
    io.emit('message', msg);
    console.log(msg);
  });
});

http.listen(666, function()  {
});
