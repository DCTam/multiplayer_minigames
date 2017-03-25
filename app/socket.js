module.exports = (io) => {

	let usersConnected = 0;

	io.on('connection', function(socket){
			
		//Socket for main chat room
		socket.on('joinMain', () => {
			socket.join("MainChat", () => {
				console.log("A user connected")
				usersConnected++;
				io.emit('updateOnlineUsers', usersConnected)

				socket.on('chat message', (messageObj) => {
					console.log(messageObj.username +": " + messageObj.message);
					io.emit('push message', messageObj);
				});

				socket.on('disconnect',() => {
					console.log('A user disconnected');
					usersConnected--;
					io.emit('updateOnlineUsers', usersConnected)
				});
			});
		});

		//ownerObj contains: ownerName, roomName, roomId(socketid)
		socket.on("createRoom" + socket.id, (ownerObj) => {
			
			socket.emit('roomCreated', {
					ownerObj: ownerObj,
					capacity: 1,
					enemyName: ''
			});
		});
	

	});
	
}