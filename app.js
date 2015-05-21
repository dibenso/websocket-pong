var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var root_path = process.cwd();

app.use(express.static(root_path));

app.get('/', function(req, res) {
  res.sendFile(root_path + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket) {
  console.log('Client connected');
  
  if(players < 2) {
    players++;
    if(players === 1)
      socket.emit('player_enter', 1);
    else if(players === 2) {
      socket.emit('player_enter', 2);
      io.emit('start_game', 'ok'); 
      players = 0;
    }
  }
  socket.on('move', function(data) {
    socket.broadcast.emit('move', data);
  });
});
