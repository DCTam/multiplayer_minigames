module.exports = (io) => {

	let usersConnected = 0;

	io.on('connection', function(socket){
			
		socket.join("MainChat", () => {
			console.log("A user connected")
			usersConnected++;
			io.emit('updateOnlineUsers', usersConnected)

			socket.on('chat message', (messageObj) => {
				console.log(messageObj.user +": " + messageObj.message);
				io.emit('push message', messageObj);
			});

			socket.on('disconnect',() => {
				console.log('A user disconnected');
				usersConnected--;
				io.emit('updateOnlineUsers', usersConnected)
   			});

		});

	});
	
}