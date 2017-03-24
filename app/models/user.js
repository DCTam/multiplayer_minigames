//Mongoose and encryption library
let mongoose = require('mongoose');
let bcrypt   = require('bcrypt-nodejs');

//Define schema
let userSchema = mongoose.Schema({

    local            : {
        username     : String,
        password     : String,
    }
});

//Creating the hash for password
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//Validate password
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);