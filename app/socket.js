module.exports = (io) => {

	io.on('connection', function(socket){

		socket.on('chat message', (pass) => {
			console.log(pass.user.local.username +": " + pass.message);
			io.emit('push message', pass);
		});

		socket.on('disconnect', function(){
        	console.log('A user disconnected');
   		});

	});
	
}