const remoteEmitterPort = 3000;
const host = "34.192.207.11";
var d2gsi = require('dota2-gsi');
var socket = require('socket.io-client')('http://' + host + ':' + remoteEmitterPort);

var server = new d2gsi({
    port: 443
});


server.events.on('newclient', function(client) {
      let auth = client.auth.token;
      let partyId = auth.split("_")[0];
      let playerToken = auth.split("_")[1];

      console.log("Client connected. Party ID : " + partyId + ", player ID " + playerToken );

      client.on('newdata', function(data) {

	// If there are multiple players data, split the packets.
	if(client.gamestate.player.team2)
	{
		let direPlayers = client.gamestate.player.team2;
		let radiantPlayers = client.gamestate.player.team3;

		let keys = Object.keys(direPlayers);

		for(i = 0; i < keys.length; i++)
		{
	
			console.log(client.gamestate.player.team2[keys[i]]);

	
        		let payload = {
         			"partyId" : data.partyId,
         			"playerToken": client.gamestate.player.team2[keys[i]].name,
          			"payload": {
					"gamestate": {
						"player": client.gamestate.player.team2[keys[i]],
						"hero": client.gamestate.hero.team2[keys[i]],
						"items": client.gamestate.items.team2[keys[i]],
						"abilities": client.gamestate.abilities.team2[keys[i]],
						"buildings": client.gamestate.buildings
					}
				}
        		};

			socket.emit(partyId, payload);

			//client.gamestate.hero = client.gamestate.hero.team2[keys[i]];
		}


		keys = Object.keys(radiantPlayers);
		for(i = 0; i < keys.length; i++)
		{
	
			console.log(client.gamestate.player.team3[keys[i]]);

	
        		let payload = {
         			"partyId" : data.partyId,
         			"playerToken": client.gamestate.player.team3[keys[i]].name,
          			"payload": {
					"gamestate": {
						"player": client.gamestate.player.team3[keys[i]],
						"hero": client.gamestate.hero.team3[keys[i]],
						"items": client.gamestate.items.team3[keys[i]],
						"abilities": client.gamestate.abilities.team3[keys[i]],
						"buildings": client.gamestate.buildings
					}
				}
        		};

			socket.emit(partyId, payload);

			//client.gamestate.hero = client.gamestate.hero.team3[keys[i]];
		}

	}

	else
	{
        let payload = {
          "partyId" : partyId,
          "playerToken": playerToken,
          "payload": client
        };



        socket.emit(partyId, payload);
	}
      });

});

