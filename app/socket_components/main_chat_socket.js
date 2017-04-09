//Number of users connected to main chat
let usersConnectedMainChat = 0;

//Messages saved
let messages = [];

module.exports = (io, socket) => {

	//Join channel and pass in user connected count and messages
	socket.join('MainChat');
	usersConnectedMainChat++;
	io.to('MainChat').emit('updateOnlineUsers', [usersConnectedMainChat, messages]);

	//Message Sending
	socket.on('chatMessage', (messageObj) => {
		messages.push(messageObj.username +": " + messageObj.message);
		io.to('MainChat').emit('pushMessage', messageObj);
	});

	//On disconnect from main chat, decrement user online count
	socket.on('disconnect',() => {
		console.log('A user disconnected');
		usersConnectedMainChat--;
		socket.leave('MainChat');
		io.emit('updateOnlineUsers', [usersConnectedMainChat, messages]);
	});

}