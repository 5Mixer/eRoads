//Get the trip model

var Trip = require('./models/trip.js');

//Export a function that requires the app
module.exports = function (app,passport) {
	//Handle different routes.

	app.get('/api/trips', isLoggedIn, function(req,res){
		Trip.find(function(error, trips){
			//Return all trips, or any thrown error.
			if (error)
				res.send(error);

			res.json(trips);
		})
	});

	app.post('/api/trips', isLoggedIn, function(req, res){

	});

	//This is called generally by a signup form.
	app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});



	app.get("/log", function(req, res) {
		res.sendfile('./public/log.html');
	});
	app.get("/signup", function(req, res) {
		res.sendfile('./public/signup.html');
	});
	app.get("/login", function(req, res) {
		res.sendfile('./public/login.html');
	});
	app.get("/trip", function(req, res) {
		res.sendfile('./public/trip.html');
	});

	//Point any unknown requests to the home page.
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load our public/index.html file
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
