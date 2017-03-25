//Stylesheets
const styleArr = [
	{style: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.0/css/bulma.min.css', type: 'text/css', rel: 'stylesheet'},
	{style: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', type: 'text/css', rel: 'stylesheet'}
]

module.exports = (app, passport, router) => {
	
	router.get('/', (req, res) => {
		let vueData = {
			data: {
			},
			vue: {
				head: {
					title: 'Play Site',
					meta: styleArr
				},
				components: ['topnav']
			}
		};
		res.render('index', vueData);
	});

	router.get('/signin', (req, res) => {
		let vueData = {
			data: {
				message: req.flash()
			},
			vue: {
				head: {
					title: 'Login Page',
					meta: styleArr
				},
				components: ['topnav','signinform']
			}
		};
		res.render('signin', vueData);
	});

	 router.post('/signin', passport.authenticate('local-login', {
        successRedirect : '/homepage', // redirect to the secure profile section
        failureRedirect : '/signin', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

	router.get('/signup', (req, res) => {
		let vueData = {
			data: {
				message: req.flash()
			},
			vue: {
				head: {
					title: 'Registration Page',
					meta: styleArr
				},
				components: ['topnav','signupform']
			}
		};
		res.render('signup', vueData);
	});

	router.post('/signup', passport.authenticate('local-signup',{
		successRedirect: '/homepage',
		failureRedirect: '/signup',
		failureFlash : true
	}));

	router.get('/homepage', isLoggedIn, (req, res) => {
		let vueData = {
			data: {
				username: req.user.local.username
			},
			vue: {
				head: {
					title: 'Homepage',
					meta: [
					{style: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.0/css/bulma.min.css', type: 'text/css', rel: 'stylesheet'},
					{style: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', type: 'text/css', rel: 'stylesheet'},
					{script: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js'}
					]
				},
				components: ['authnav', 'chatroom', 'rps', 'profile', 'coinflip', 'leaderboard']
			}
		};

		res.render('auth_homepage', vueData);
	});

	router.get('/logout', (req, res) => {
		req.session.destroy((err) => {
    		res.redirect('/');
  		});
	});

	return router;
}

function isLoggedIn(req, res, next){
		if (req.isAuthenticated()){
			return next();
		}
		res.redirect('/');
	}