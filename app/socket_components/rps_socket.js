const crud = require('../mongo/crud.js');

//Example of room object
// {
// 	usersConnectedRPS: 0,
// 	socketId: {
// 		roomName: null,
// 		roomId: null,
//		isReadyToStart: null,
// 		capacity: null,
// 		player1: null,
// 		player1Choice: null,
// 		player2: null,
// 		player2Choice: null
// 	}
// }
let roomsRPS = {
	usersConnectedRPS: 0
}

module.exports = (io, socket) => {

	//Increment number of users connnected
	roomsRPS['usersConnectedRPS']++;

	//Initialize room list and player count
	io.emit('refreshRPSRooms', roomsRPS);

	//Create room event
	socket.on('createRoom', (roomObj) => {
		roomsRPS[socket.id] = {
			roomName: roomObj.roomName,
			roomId: socket.id,
			isReadyToStart: false,
			capacity: 1,
			player1: roomObj.ownerName,
			player2: ''
		}

		//Refresh room after creating room
		io.emit('refreshRPSRooms', roomsRPS);

		//Automatically have room creator join created room
		socket.join('room#' + socket.id);
	});

	//Allows second player to join a room
	//roomObj: {roomIdToJoin, player2username}
	socket.on('joinRoom', (roomObj) => {

		//Join the room
		socket.join('room#' + roomObj.roomIdToJoin);

		//Update the room information
		roomsRPS[roomObj.roomIdToJoin].capacity = 2;
		roomsRPS[roomObj.roomIdToJoin].player2 = roomObj.player2username;
		roomsRPS[roomObj.roomIdToJoin].isReadyToStart = true;

		//Update the room list
		io.emit('refreshRPSRooms', roomsRPS);
	});

	//Delete room entry from list when leaving room and update the room list
	socket.on('leaveRoom', (idObj) => {
		//If owner leaves game, close room for both players
		if(idObj.leaverId === idObj.ownerId){
			delete roomsRPS[idObj.ownerId];
		}
		//If challenger leaves room, open up space
		else {
			roomsRPS[idObj.ownerId].capacity = 1;
			roomsRPS[idObj.ownerId].player2 = '';
			roomsRPS[idObj.ownerId].isReadyToStart = false;

		}
		socket.leave('room#' + idObj.ownerId);
		io.emit('refreshRPSRooms', roomsRPS);
	});

	//Delete room entry from list when user disconnects
	socket.on('disconnect', () => {
		delete roomsRPS[socket.id];
		roomsRPS['usersConnectedRPS']--;
		io.emit('refreshRPSpRooms', roomsRPS);
	});

	//Logic when game is started
	socket.on('startGame', (activeRoomId) => {

		io.to('room#' + activeRoomId).emit("startSelection");

		//io.to('room#' + activeRoomId).emit('startingGame', winner);
	});

	//roomObj contains roomId, isOwner and userChoice
	socket.on('userHasSelected', (roomObj) => {

		//If owner is true, then player 1 sent their selection
		if(roomObj.isOwner){
			roomsRPS[roomObj.roomId].player1Choice = roomObj.userChoice;
		}
		//Else, player 2 sent their decision
		else {
			roomsRPS[roomObj.roomId].player2Choice = roomObj.userChoice;
		}

		//When both players has selected, decide on winner
		if(roomsRPS[roomObj.roomId].player1Choice && roomsRPS[roomObj.roomId].player2Choice){
			console.log(roomsRPS[roomObj.roomId].player1Choice + roomsRPS[roomObj.roomId].player2Choice);

			let winner;
			let loser;
			let isTie = false;
			let winnerChoice;

			if(roomsRPS[roomObj.roomId].player1Choice == roomsRPS[roomObj.roomId].player2Choice){
				winner = null;
				isTie = true;
				winnerChoice = roomObj.userChoice;
			}
			else if (roomsRPS[roomObj.roomId].player1Choice == 'Rock' && roomsRPS[roomObj.roomId].player2Choice == 'Scissor'
					|| roomsRPS[roomObj.roomId].player1Choice == 'Paper' && roomsRPS[roomObj.roomId].player2Choice == 'Rock'
					|| roomsRPS[roomObj.roomId].player1Choice == 'Scissor' && roomsRPS[roomObj.roomId].player2Choice == 'Paper'
			){
				winner = roomsRPS[roomObj.roomId].player1;
				winnerChoice = roomsRPS[roomObj.roomId].player1Choice;
				loser = roomsRPS[roomObj.roomId].player2;
			}
			else {
				winner = roomsRPS[roomObj.roomId].player2;
				winnerChoice = roomsRPS[roomObj.roomId].player2Choice;
				loser = roomsRPS[roomObj.roomId].player1;
			}
			console.log(winner);
			io.to('room#' + roomObj.roomId). emit('gameDecision', {
				winnerName: winner,
				winnerChoice: winnerChoice
			});

			//Clear choices incase both user stays in room for more rounds
			roomsRPS[roomObj.roomId].player1Choice = null;
			roomsRPS[roomObj.roomId].player2Choice = null;

			isTie ? crud.updateWinsLosses(roomsRPS[roomObj.roomId].player1, roomsRPS[roomObj.roomId].player2, true) : crud.updateWinsLosses(winner, loser, false);
		}
	});

}