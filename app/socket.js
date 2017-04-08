module.exports = (io) => {

	//Number of users connected to main chat
	let usersConnectedMainChat = 0;

	//objId: {roomName, capacity, player1, player2}
	let rooms = {
		room1: {
			roomName: "Everyone join!",
			capacity: 1,
			player1: 'dan',
			player2: 'bob'
		},
		room2: {
			roomName: "Hello",
			capacity: 2,
			player1: 'lul',
			player2: 'ctam'
		}
	};

	io.on('connection', function(socket){
			
		//Socket for main chat room
		socket.on('joinMain', () => {
			socket.join("MainChat", () => {
				console.log("A user connected to main chat")
				usersConnectedMainChat++;
				io.emit('updateOnlineUsers', usersConnectedMainChat)

				//Message Sending
				socket.on('chat message', (messageObj) => {
					console.log(messageObj.username +": " + messageObj.message);
					io.emit('push message', messageObj);
				});

				//On disconnect
				socket.on('disconnect',() => {
					console.log('A user disconnected');
					usersConnectedMainChat--;
					io.emit('updateOnlineUsers', usersConnectedMainChat)
				});
			});
		});
		
		//Returns back coin flip room list
		socket.on('displayCoinFlipRooms', () => {

			//Initialize room list
			io.emit('refreshCoinFlipRooms', rooms);

			socket.on('createRoom', (roomObj) => {
				rooms[socket.id] = {
					roomName: roomObj.roomName,
					roomId: socket.id,
					capacity: 1,
					player1: roomObj.ownerName,
					player2: ''
				}

				//Refresh room after creating room
				io.emit('refreshCoinFlipRooms', rooms);

				socket.join('room#' + socket.id, (roomObj) => {

				});

			});

			//Delete room entry when leaving created room
			socket.on('removeRoom', (idToRemove) => {
				delete rooms[idToRemove];
				io.emit('refreshCoinFlipRooms', rooms);
			});
			
		});

	
	});
}