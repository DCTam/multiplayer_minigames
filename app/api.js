module.exports = (router) => {

	router.get('/', (req, res) => {
		res.send("API calls here soon");
	});

	router.get('/:username', (req, res) => {

		res.setHeader('Content-Type', 'application/json'); //Set Header

		//Check if pretty is requested as query parameter
		if(req.query.pretty == 'true'){
			res.send(JSON.stringify({ a: req.params['username'], pretty: req.query['pretty']}, null, '\t'));
		}
    	else {
			res.send(JSON.stringify({ a: req.params['username']}));
		}
	});

	return router;
}