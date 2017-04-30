module.exports = (io) => {

	io.on('connection', (socket) => {
			
		//Called when user clicks on MainChat component
		socket.on('joinMainChat', () => {
			require('./socket_components/main_chat_socket.js')(io, socket);
		});
		
		//Called when user clicks on CoinFlip component
		socket.on('joinCoinFlipLobby', () => {
			require('./socket_components/coin_flip_socket.js')(io, socket);
		});

		//Called when user clicks on CoinFlip component
		socket.on('joinRPSLobby', () => {
			require('./socket_components/rps_socket.js')(io, socket);
		});

		//Called when user clicks on Profile component
		socket.on('joinProfile', (username) => {
			require('./socket_components/profile_socket.js')(io, socket, username);
		});

	});
}