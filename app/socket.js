module.exports = (io) => {

	//Number of users connected to main chat
	let usersConnectedMainChat = 0;

	//socketId: {roomName, roomId, capacity, player1, player2}. Example rooms
	let rooms = {
		room1: {
			roomName: 'Everyone join!',
			roomId: 'dgdfg',
			capacity: 1,
			player1: 'dan',
			player2: 'bob'
		},
		room2: {
			roomName: 'Hello',
			roomId: 'mememeee',
			capacity: 2,
			player1: 'lul',
			player2: 'ctam'
		}
	};

	io.on('connection', function(socket){
			
		//Called when user clicks on Chatroom component
		socket.on('joinMain', () => {
			socket.join('MainChat', () => {
				console.log('A user connected to main chat');
				usersConnectedMainChat++;
				io.emit('updateOnlineUsers', usersConnectedMainChat)

				//Message Sending
				socket.on('chat message', (messageObj) => {
					console.log(messageObj.username +": " + messageObj.message);
					io.emit('push message', messageObj);
				});

				//On disconnect from main chat, decrement user online count
				socket.on('disconnect',() => {
					console.log('A user disconnected');
					usersConnectedMainChat--;
					io.emit('updateOnlineUsers', usersConnectedMainChat)
				});
			});
		});
		
		//Called when user clicks on CoinFlip component
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

				//Automatically have room creator join created room
				socket.join('room#' + socket.id);

			});

			//Delete room entry from list when leaving created room and update the room list
			socket.on('removeRoom', (idToRemove) => {
				delete rooms[idToRemove];
				io.emit('refreshCoinFlipRooms', rooms);
			});

			//Allows second player to join created room
			//roomArr[0] is roomIdToJoin, roomArr[1] is player2username
			socket.on('joinRoom', (roomArr) => {

				//Join the created room
				socket.join('room#' + roomArr[0]);

				//Update the room information
				rooms[roomArr[0]].capacity = 2;
				rooms[roomArr[0]].player2 = roomArr[1];

				//Update the room list
				io.emit('refreshCoinFlipRooms', rooms);
			});
			
		});

	
	});
}