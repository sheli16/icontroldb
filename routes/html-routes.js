var UserModel = require('../models/User.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var orm = require('../db/orm.js');
var ormdb = require('../db/ormdb.js');

//Setting the strategy for Passport
passport.use(new LocalStrategy({passReqToCallback : true},
  function(req, username, password, done) {

  	//Searching the ORM for the user in the database
  	orm.findUser(username, function(err, user){
  		user = user[0];
  		if (err) { return done(err); }
      if (!user) { return done(null, false); }

      //comparing user passwords - return if not a match
      if (password !== user.password) { return done(null, false);}

      return done(null, user);
  	});
  }
));

//These two methods are required to keep the user logged in via the session
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = function(app){

	//GETs

	app.get('/verify', function(req, res){
		res.render('verify', {
			welcomeText: "Sign In",
			actionBtn: 'signin',
			message: req.flash('error')[0],
			otherAction: "Signup"
		});
	});

	app.get('/signin', function(req, res){
		res.redirect('/')
	});

	app.get('/signup', function(req, res){
		res.render('verify', {
			welcomeText: "Sign Up",
			actionBtn: 'signup',
			otherAction: "Signin"
		});
	});

	/////////////////////////////////////////////
	//		My Stuff between the lines!
	/////////////////////////////////////////////

	app.get('/', function(req, res){
		res.render('index', {
			
		});
	});

	app.get('/index', function(req, res){
		res.redirect('/');
	});

	app.get('/page2', function(req, res){
		if (req.isAuthenticated()) {
			
			ormdb.selectAll(req.user.userId, function(result){
		            res.render('page2', {
		            	inventory1: result
		            });
			});
			
		}
		else {
			
			res.redirect('/verify');
		}
	});

	app.get('/page3', function(req, res){
		if (req.isAuthenticated()) {
			res.render('page3', {
				
			});
		}
		else {
			res.redirect('/verify');
		}
	});

	app.get('/page4', function(req, res){
		if (req.isAuthenticated()) {
			console.log(req.user.userId);
			res.render('page4', {
				
			});
		}
		else {
			res.redirect('/verify');
			
		}
	});

	app.get('/page5', function(req, res){
		if (req.isAuthenticated()) {
			res.render('page5', {
				
			});
		}
		else {
			
			res.redirect('/verify');
		}
	});

	app.get('/chart1', function(req, res){
		if (req.isAuthenticated()) {
			res.render('chart1', {
				
			});
		}
		else {
			
			res.redirect('/verify');
		}
	});

	app.get('/chart2', function(req, res){
		if (req.isAuthenticated()) {
			res.render('chart2', {
				
			});
		}
		else {
			
			res.redirect('/verify');
		}
	});

	app.post('/update/:id', function (req, res) {
		    //connection.query('UPDATE burgers SET devoured = ? WHERE id = ?', [true, req.params.id]);            
            //orm.updateOne('inventory', 'devoured', req.params.id,  function(result){
            console.log('not ready for this function yet')	
           	res.redirect('/page3');
 			//});
    });// end  app.post (update)
		    		
	
	app.post('/create', function (req, res) {
		   if (req.isAuthenticated()) {
			console.log(req.body.descInput)
			ormdb.insertOne(req.user.userId, req.body.nameInput, req.body.descInput, req.body.groupInput, req.body.wholeSaleInput,req.body.retailPriceInput, req.body.inStockInput, req.body.mRPInput, function(result){			    
					res.redirect('/page2'); 
		    }); 
		} else {
			res.redirect('/verify')
		}
		   
			

	}); // end  app.post (create)


	/////////////////////////////////////////////
	//		End of My Stuff!
	/////////////////////////////////////////////



	app.get('/authenticated', function(req,res){
		if (req.isAuthenticated()) {
			res.render('authenticated', {
				username: req.user.username
			})
		} else {
			res.redirect('/verify')
		}
	});

	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

	//POSTs

	app.post('/signin', passport.authenticate('local',{failureRedirect:'/verify', failureFlash:'Wrong Username or Password'}), function(req, res){
		res.redirect('/authenticated');
	});

	app.post('/signup', function(req, res){
		var user = new UserModel(req.body);
		UserModel.saveUser(user, function(status){
			if(!status) {
				res.redirect('/signup')
				return false
			}
			res.redirect('/verify');
		});
	});

};