module.exports = (io) => {

	io.on('connection', (socket) => {
			
		//Require socket function when a user joins the main chat
		socket.on('joinMainChat', () => {
			require('./socket_components/main_chat_socket.js')(io, socket);
		});
		
		//Called when user clicks on CoinFlip component
		socket.on('joinCoinFlipLobby', () => {
			require('./socket_components/coin_flip_socket.js')(io, socket);
		});

	});
}