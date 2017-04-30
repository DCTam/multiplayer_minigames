const crud = require('./mongo/crud.js');

module.exports = (router) => {

	router.get('/api', (req, res) => {
		res.end("Retreiving player statistics: \nCall '/api/{username}' replacing username \nadd '?pretty=true' at end of API call to prettify JSON result");
	});

	router.get('/api/:username', (req, res) => {

		const userToCheck = crud.retrieveProfile(req.params['username'], (err, doc) => {

			if(doc){
				res.setHeader('Content-Type', 'application/json'); //Set Header

				if(req.query.pretty == 'true'){
					res.send(JSON.stringify(doc, null, '\t'));
				}
				else {
					res.send(doc);
				}
			}
			else {
				res.send('User not found')
			}
		});
	});

	return router;
}