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


	//This is called generally by a signup form.
	app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the home
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

	app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the home
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


	app.get("/log",isLoggedIn, function(req, res) {
		res.redirect('/#/log');
	});

	app.get("/login",isLoggedIn, function(req, res) {
		res.redirect('/#/login');
	});

	// app.get("/signup",isLoggedIn, function(req, res) {
	// 	res.redirect('/#/signup');
	// });
	// app.get("/signup", function(req, res) {
	// 	res.sendfile('./public/signup.html');
	// });
	// app.get("/login", function(req, res) {
	// 	res.sendfile('./public/login.html');
	// });
	// app.get("/trip",isLoggedIn, function(req, res) {
	// 	res.sendfile('./public/trip.html');
	// });


	app.get('/',function(req,res){
		if (req.isAuthenticated()){
			res.sendfile('./public/loggedIn.html');
		}else{
			res.sendfile('./public/landing.html');
		}
	});

	//Point any unknown requests to the home page.
	app.get('*', function(req, res) {
		res.redirect('/');
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
