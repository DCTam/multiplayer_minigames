const crud = require('../mongo/crud.js');
const mongoose = require('mongoose');


module.exports = (io, socket, username) => {

	//socket.join('profile#' + socket.id);

	//Run immediately for first time
	crud.retrieveProfile(username, (err, doc) => {
			socket.emit('refreshProfileStats', doc);
	});

	//Update every 30 seconds
	setInterval(()=>{
		crud.retrieveProfile(username, (err, doc) => {
			socket.emit('refreshProfileStats', doc);
		});
	}, 30000);

	crud.retrieveLeaderboard((err,doc) => {
		socket.emit('refreshLeaderBoard', doc);
	});

}