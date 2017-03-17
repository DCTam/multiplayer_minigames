const express = require('express');
const expressVue = require('express-vue')
const router = express.Router();

router.use(function timeLog(req, res, next){
	console.log('Time: ' + Date.now())
	next()
});

router.get('/', (req, res) => {
	let vueData = {
		data: {
		},
		vue: {
			head: {
				title: 'Play Site',
				meta: [
					{style: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css', type: 'text/css', rel: 'stylesheet'}
				]
			},
			components: ['hello', 'topnav']
		}
	}

    res.render('index', vueData);
});

// router.get('/hello', (req, res) => {
// 	res.send("hey");
// });

module.exports = router;