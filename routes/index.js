const express = require('express');
const expressVue = require('express-vue');
const router = express.Router();

const styleBulma = {style: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.0/css/bulma.min.css', type: 'text/css', rel: 'stylesheet'};

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
					styleBulma
				]
			},
			components: ['topnav']
		}
	};
    res.render('index', vueData);
});

router.get('/signup', (req, res) => {
	let vueData = {
		data: {
			'su-selected': true,
			'si-selected': false
		},
		vue: {
			head: {
				title: 'Sign up',
				meta: [
					styleBulma
				]
			},
			components: ['topnav', 'signupform']
		}
	};
	res.render('signup', vueData);
});

router.get('/signin', (req, res) => {
	let vueData = {
		data: {
			'su-selected': false,
			'si-selected': true
		},
		vue: {
			head: {
				title: 'Sign In',
				meta: [
					styleBulma
				]
			},
			components: ['topnav', 'signinform']
		}
	};
	res.render('signup', vueData);
});


// router.get('/hello', (req, res) => {
// 	res.send("hey");
// });

module.exports = router;