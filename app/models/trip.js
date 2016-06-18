//Grab mongoose
var mongoose = require('mongoose');

//Define the model/schema
module.exports = mongoose.model('Trip', {
	date: Date,
	odomoterStart: Number,
	odomoterEnd: Number,

	parking: Boolean

});
