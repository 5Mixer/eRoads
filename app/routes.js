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

	//
	// app.get("/log",isLoggedIn, function(req, res) {
	// 	res.redirect('/#/log');
	// });
	//
	// app.get("/login",isLoggedIn, function(req, res) {
	// 	res.redirect('/#/login');
	// });

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

	//This is the part of the app the used to work when the client was not a
	//single page application. Now, this is useless, because the client itself
	//should load both the logged in and public view, just only display the logged in
	//view when angular knows it is ready. Perhaps this could return a cookie with
	//login/auth status.
	// app.get('/',function(req,res){
	// 	if (req.isAuthenticated()){
	// 		res.sendfile('./public/loggedIn.html');
	// 	}else{
	// 		res.sendfile('./public/landing.html');
	// 	}
	// });
	//
	// //Point any unknown requests to the home page.
	// app.get('*', function(req, res) {
	// 	res.redirect('/');
	// });

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
