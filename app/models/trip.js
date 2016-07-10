//Grab mongoose
var mongoose = require('mongoose');

//Define the model/schema
var tripSchema = mongoose.Schema({
	odometer:{type:Number,required:true},
	traffic:{ type: String, required: true },
	light:{ type: String, required: true },
	parking: { type: Boolean, required: true },
	wet: { type: Boolean, required: true },
	localStreets: { type: Boolean, required: true },
	mainRoads: { type: Boolean, required: true },
	innerCity: { type: Boolean, required: true },
	freeway: { type: Boolean, required: true },
	ruralHighway: { type: Boolean, required: true },
	ruralStreets: { type: Boolean, required: true },
	gravel:{ type: Boolean, required: true },
	registration: { type: String, required: true },
	supervisor:{ type: String, required: true }
});

//We export the schema, but use it to create the model.
module.exports = mongoose.model("Trip",tripSchema);
