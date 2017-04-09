//socketId: {roomName, roomId, capacity, player1, player2}, {usersConnectedCoinFlip: #}
let rooms = {
	usersConnectedCoinFlip: 0
};

module.exports = (io, socket, rooms) => {
	//Increment number of users connnected
	rooms['usersConnectedCoinFlip']++;

	//Initialize room list and player count
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

		//Join the room
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
		rooms['usersConnectedCoinFlip']--;
		io.emit('refreshCoinFlipRooms', rooms);
	});
		
	//Logic when game is started
	socket.on('startGame', (activeRoomId) => {

		//Randomly roll number 1-2 and select winner based on that
		let random = Math.floor(Math.random() * 2) + 1;
		let winner;
		(random == 1) ? winner = rooms[activeRoomId].player1 : winner = rooms[activeRoomId].player2;
		console.log(winner);

		io.to('room#' + activeRoomId).emit('startingGame', winner);
	});
}

