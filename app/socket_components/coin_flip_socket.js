//socketId: {roomName, roomId, isReadyToStart, capacity, player1, player2}, {usersConnectedCoinFlip: #}
let roomsCF = {
	usersConnectedCoinFlip: 0
};

module.exports = (io, socket) => {
	//Increment number of users connnected
	roomsCF['usersConnectedCoinFlip']++;

	//Initialize room list and player count
	io.emit('refreshCoinFlipRooms', roomsCF);

	socket.on('createRoom', (roomObj) => {
		roomsCF[socket.id] = {
			roomName: roomObj.roomName,
			roomId: socket.id,
			isReadyToStart: false,
			capacity: 1,
			player1: roomObj.ownerName,
			player2: ''
		}

		//Refresh room after creating room
		io.emit('refreshCoinFlipRooms', roomsCF);

		//Automatically have room creator join created room
		socket.join('room#' + socket.id);

	});

	//Allows second player to join a room
	//roomObj: {roomIdToJoin, player2username}
	socket.on('joinRoom', (roomObj) => {

		//Join the room
		socket.join('room#' + roomObj.roomIdToJoin);

		//Update the room information
		roomsCF[roomObj.roomIdToJoin].capacity = 2;
		roomsCF[roomObj.roomIdToJoin].player2 = roomObj.player2username;
		roomsCF[roomObj.roomIdToJoin].isReadyToStart = true;

		//Update the room list
		io.emit('refreshCoinFlipRooms', roomsCF);
	});

	//Delete room entry from list when leaving room and update the room list
	socket.on('leaveRoom', (idObj) => {
		//If owner leaves game, close room for both players
		if(idObj.leaverId === idObj.ownerId){
			delete roomsCF[idObj.ownerId];
		}
		//If challenger leaves room, open up space
		else {
			roomsCF[idObj.ownerId].capacity = 1;
			roomsCF[idObj.ownerId].player2 = '';
			roomsCF[idObj.ownerId].isReadyToStart = false;

		}
		socket.leave('room#' + idObj.ownerId);
		io.emit('refreshCoinFlipRooms', roomsCF);
	});

	//Delete room entry from list when user disconnects
	socket.on('disconnect', () => {
		delete roomsCF[socket.id];
		roomsCF['usersConnectedCoinFlip']--;
		io.emit('refreshCoinFlipRooms', roomsCF);
	});
		
	//Logic when game is started
	socket.on('startGame', (activeRoomId) => {

		//Randomly roll number 1-2 and select winner based on that
		let random = Math.floor(Math.random() * 2) + 1;
		let winner;
		(random == 1) ? winner = roomsCF[activeRoomId].player1 : winner = roomsCF[activeRoomId].player2;
		console.log(winner);

		io.to('room#' + activeRoomId).emit('startingGame', winner);
	});
}

