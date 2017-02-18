const remoteEmitterPort = 3000;
const host = "34.192.207.11";
var d2gsi = require('dota2-gsi');
var socket = require('socket.io-client')('http://' + host + ':' + remoteEmitterPort);

var server = new d2gsi({
    port: 4000
});


server.events.on('newclient', function(client) {
      let auth = client.auth.token;
      let partyId = auth.split("_")[0];
      let playerToken = auth.split("_")[1];

      console.log("Client connected. Party ID : " + partyId + ", player ID " + playerToken );

      client.on('newdata', function(data) {

        let payload = {
          "partyId" : partyId,
          "playerToken": playerToken,
          "payload": client
        };

        socket.emit(partyId, payload);
      });

});

