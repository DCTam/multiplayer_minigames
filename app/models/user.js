//Mongoose and encryption library
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

//Define schema
const userSchema = mongoose.Schema({

	username: String,
	password: String,
	wins: Number,
	losses: Number
    
});

//Creating the hash for password
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//Validate password
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);