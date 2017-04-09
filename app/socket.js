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
					isReadyToStart: false,
					capacity: 1,
					player1: roomObj.ownerName,
					player2: ''
				}

				//Refresh room after creating room
				io.emit('refreshCoinFlipRooms', rooms);

				//Automatically have room creator join created room
				socket.join('room#' + socket.id);

			});

			//Allows second player to join a room
			//roomObj: {roomIdToJoin, player2username}
			socket.on('joinRoom', (roomObj) => {

				//Join a room
				socket.join('room#' + roomObj.roomIdToJoin);

				//Update the room information
				rooms[roomObj.roomIdToJoin].capacity = 2;
				rooms[roomObj.roomIdToJoin].player2 = roomObj.player2username;
				rooms[roomObj.roomIdToJoin].isReadyToStart = true;

				//Update the room list
				io.emit('refreshCoinFlipRooms', rooms);
			});

			//Delete room entry from list when leaving room and update the room list
			socket.on('leaveRoom', (idObj) => {
				//If owner leaves game, close room for both players
				if(idObj.leaverId === idObj.ownerId){
					delete rooms[idObj.ownerId];
				}
				//If challenger leaves room, open up space
				else {
					rooms[idObj.ownerId].capacity = 1;
					rooms[idObj.ownerId].player2 = '';
					rooms[idObj.ownerId].isReadyToStart = false;

				}
				socket.leave('room#' + idObj.ownerId);
				io.emit('refreshCoinFlipRooms', rooms);
			});

			//Delete room entry from list when user disconnects
			socket.on('disconnect', () => {
				delete rooms[socket.id];
				io.emit('refreshCoinFlipRooms', rooms);
			});
			
		});

	
	});
}