var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client.html');
});

let partyPool = [];
let  mockUserData = {
  "username": "aarong11"
};

const partyId = '826df0d0';

io.on('connection', function(socket){
  socket.on(partyId, function(msg){
    let payload = JSON.stringify(msg);
    io.emit(partyId, payload);
    console.log(payload);

  });
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});

