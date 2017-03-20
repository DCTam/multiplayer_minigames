//Variable setup
const express = require('express');
const expressVue = require('express-vue');
const path = require('path');
const passport = require('passport');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const port = process.env.PORT || 8080;

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');


//Database configuration
const configDB = require('./configs/database.js');
mongoose.connect(configDB.url);

//Passport configuration
require('./configs/passport.js');

//Middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Passport middlewares
app.use(session({ secret: 'daniel' , resave: false, saveUninitialized: false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Vue.js configuration
app.engine('vue', expressVue);
app.set('view engine', 'vue');
app.set('views', path.join(__dirname, '/views'));
app.set('vue', {
    componentsDir: path.join(__dirname, '/views/components'),
    defaultLayout: 'layout'
});

//Routes
const routes = require('./app/routes.js')(app, passport, router);
app.use('/', routes);

app.listen(port, (err, res) => {
	if (err){
		console.log("ERROR: " + err);
	}
	else{
		console.log('Server running on port ' + port + '...');
	}
});