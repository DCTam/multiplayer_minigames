const crud = require('../mongo/crud.js');
const mongoose = require('mongoose');


module.exports = (io, socket, username) => {

	//Run immediately for first time
	crud.retrieveProfile(username, (err, doc) => {
			socket.emit('refreshProfileStats', doc);
	});

	crud.retrieveLeaderboard((err,doc) => {
		socket.emit('refreshLeaderBoard', doc);
	});

	//Update every 1 seconds
	setInterval(()=>{
		crud.retrieveProfile(username, (err, doc) => {
			socket.emit('refreshProfileStats', doc);
		});

		crud.retrieveLeaderboard((err,doc) => {
			socket.emit('refreshLeaderBoard', doc);
		});
	}, 1000);


}