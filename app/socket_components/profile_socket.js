const crud = require('../mongo/crud.js');
const mongoose = require('mongoose');


module.exports = (io, socket, username) => {

	socket.join('profile#' + socket.id);

	//setInterval(()=>{}, 500000);

	crud.retrieveProfile(username, (err, doc) => {
		io.to('profile#' + socket.id).emit('refreshStats', doc);
		console.log(doc);
	});
	

	//io.to('profile#' + socket.id).emit('refreshStats');



}