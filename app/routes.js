//Get the trip model

var Trip = require('./models/trip.js');
var User = require('./models/user.js');

//Export a function that requires the app
module.exports = function (app,passport) {

	//Handle different routes.
	app.get('/api/trips', isLoggedIn, function(req,res){
		User.findOne({ 'email' :  req.user.email }, function(err, user) {
			if (user){
				res.json(user.trips);
			}else{
				//Authenticated user is not in the db? wtf?
				console.log(err);
			}
		});
	});

	app.get('/api/trips/:id', isLoggedIn, function(req,res){
		User.findOne({ 'email' :  req.user.email }, function(err, user) {
			if (user){
				res.json(user.trips.id(req.params.id));

			}else{
				//Authenticated user is not in the db? wtf?
				console.log(err);
			}
		});
	});

	app.post('/api/trips',isLoggedIn, function(req,res) {
		console.log("Trip posted");

		var tripDetails = req.body;
		//...do validation...
		// tripDetails.startTime = Date.now;

		console.log(req.body);
		User.findOne({ 'email' :  req.user.email }, function(err, user) {
			if (err){
				return done(err);
			}
			if (user){
				//Do validation of trip data. Putting req.body in is naive.
				//user.trips.push(new Trip(req.body));
				user.trips.push(req.body);
				//console.log(user.trips);
				user.save(function (err){
					console.log(err);
					res.send("Failed to store trip data - was form complete?"+err);
				});
			}else{
				return done("No such user is registered");
			}
		})
	});

	app.post('/api/trips/:id',isLoggedIn, function(req,res) {
		console.log("Trip updated");

		var tripDetails = req.body;
		//...do validation...

		console.log(req.body);

		User.findOneAndUpdate(
			{ 'email' :  req.user.email, "trips._id" : req.body._id },
			{
				"$set" : {
					"trips.$" : req.body
				}
			},
			function(err,doc) {
				console.log(err);
				console.log(doc);
			}
		);
		User.findOne({ 'email' :  req.user.email }, function(err, user) {
			if (err){
				return done(err);
			}
			if (user){
				user.save(function (err){
					console.log(err);
					res.send("Failed to update trip data - was form complete?"+err);
				});
			}else{
				return done("No such user is registered");
			}
		})
	});

	app.delete('/api/trips/:id',isLoggedIn, function(req,res){
		console.log("Deleting trip "+req.params.id);
		User.findOne({ 'email' :  req.user.email }, function(err, user) {
			if (user){
				user.trips.id(req.params.id).remove();

				user.save(function (err) {
					if (err) console.log(err);
					//Success.
				});

			}else{
				//Authenticated user is not in the db? wtf?
				console.log(err);
			}
		});
	});

	//Auth routes
	app.post('/signup',passport.authenticate('local-signup'),function(req,res){
		console.log("/signup post");
		if (req.user == undefined) next("err");
		res.json(200, { "secure": true, "email": req.user.email});
	});

	app.post('/login', passport.authenticate('local-login'),function(req,res){
		console.log("/login post");
		if (req.user == undefined) next("err");
		res.json(200, { "secure": true, "email": req.user.email});
	});


	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


	app.get('/*', function(req, res){
	    // var secure = false, username = '';
	    // if(req.user) {
	    //     secure = req.user.secure;
	    //     email = req.user.email;
		//
		// 	res.cookie('user', JSON.stringify({
		//         'email': email,
		//         'secure': secure
		//     }));
	    // }


	    res.sendfile('./public/index.html');
	});


	// route middleware to make sure a user is logged in
	function isLoggedIn(req, res, next) {

	    // if user is authenticated in the session, carry on
	    if (req.isAuthenticated())
	        return next();

	    // if they aren't redirect them to the home page
	    res.redirect('/');
	}
}
