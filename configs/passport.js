var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');
let passport = require('passport');

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    (req, username, password, done) => {

        process.nextTick(() => {
			User.findOne({ 'local.username' :  username }, (err, user) => {
				if (err){
					return done(err);
				}

				if (user) {
					return done(null, false, req.flash('signUpMessage', 'Username is already taken.'));
				} 
				else {

					let newUser = new User();
					newUser.local.username = username;
					newUser.local.password = newUser.generateHash(password);

					newUser.save((err) => {
						if (err){
							throw err;
						}
						return done(null, newUser);
					});
				}
			});    
        });
    }));

	passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    (req, username, password, done) => { 
        User.findOne({ 'local.username' :  username }, (err, user) => {
            if (err){
                return done(err);
			}
            // if (!user){
            //     return done(null, false, req.flash('loginMessage', 'No user found.'));
			// }
            // if (!user.validPassword(password)){
            //     return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
			// }	
			if(!user || !user.validPassword(password)){
				return done(null, false, req.flash('failMessage', 'Wrong Credentials.'))
			}
            return done(null, user);
        });
    }));

