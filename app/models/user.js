var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Trip = require('./trip.js');

var userSchema = mongoose.Schema({
	email: String,
	name: String,
	password:String,
	license:Number,
	trips: [Trip.schema]
});

//Methods for working with users.
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
