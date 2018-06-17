var User       = require('../models/user');
var Links      = require('../models/links');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');
var linkfunct	 = require('../linkfunct');

// perem for creating tokens
var tokensecret = config.tokensecret;

module.exports = function(app, express) {

	var apiRouter = express.Router();

	// AUTHENTICATE a user
	apiRouter.post('/login', function(req, res) {

	  User.findOne({login: req.body.login}).select('name login password').exec(function(err, user) {
			message: 'Ваш пользователь!'
	    if (err) throw err;

	    if (!user) {
	      res.json({ 
	      	success: false, 
	      	message: 'Пользователь не найден!' 
	    	});
	    } else if (user) {

	      var validPassword = user.comparePassword(req.body.password);
	      if (!validPassword) {
	        res.json({ 
	        	success: false, 
	        	message: 'Неправильный пароль!' 
	      	});
	      } else {

	        // if user is found and password is right create a token
	        var token = jwt.sign({
	        	name: user.name,
	        	login: user.login
	        }, tokensecret, {
	          expiresInMinutes: 1440 // 24 hours
	        });
					
	        res.json({
	          success: true,
	          message: 'Вы успешно прошли авторизацию!',
						token: token						
					});
	      }
	    }
	  });
	});

	// SIGNUP
	apiRouter.route('/signup')

		.post(function(req, res) {
			
			var user = new User('', '', '');
			user.name = req.body.name;
			user.login = req.body.login;
			user.password = req.body.password;

			user.save(function(err) {
				if (err) {
					if (err.code == 11000) 
						return res.json({ success: false, message: 'Пользователь с данным логином уже существует!'});
					else 
						return res.send(err);
				}
				res.json({ message: 'Пользователь создан!' });
			});
		});

	// LINKS OF USERS
	apiRouter.get('/info', function(req, res,next) {
		Links.find(function (err, link) {
			if (err) return next(err);
			res.json(link);
			});
		});

	// LINK INFORMATION
	apiRouter.get('/info-one/:shortlink', function(req, res,next) {
		Links.findOne({ shortlink: req.params.shortlink })
		.exec(function (err, link) {
			if (err) return next(err);
			res.json(link);
			});
	});		

	// ALL TAG LINKS
	apiRouter.get('/tag/:tagone', function(req, res,next) {
		Links.find({ tags: req.params.tagone  })
		.exec(function (err, link) {
			if (err) return next(err);
			res.json(link);
			});
	});

	// route middleware to verify a token
	apiRouter.use(function(req, res, next) {
		// do logging
		console.log('Somebody just came to our app!');

	  // check header or url parameters or post parameters for token
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];

	  // decode token
	  if (token) {

	    // verifies secret and checks exp
	    jwt.verify(token, tokensecret, function(err, decoded) {      

	      if (err) {
	        res.status(403).send({ 
	        	success: false, 
	        	message: 'Failed to authenticate token.' 
	    	});  	   
	      } else { 
	        // if everything is good, save to request for use in other routes
	        req.decoded = decoded;
	            
	        next(); // make sure we go to the next routes and don't stop here
	      }
	    });

	  } else {

	    // if there is no token
	    // return an HTTP response of 403 (access forbidden) and an error message
   	 	res.status(403).send({ 
   	 		success: false, 
   	 		message: 'No token provided.' 
   	 	});
	    
	  }
	});

	apiRouter.get('/', function(req, res) {
		res.json({ message: 'Добро пожаловать!' });	
	});

	apiRouter.route('/linkcreate')

		// ALL LINKS OF USER
		.get(function(req, res) {
			User.find({login:req.decoded.login})
				.populate('links')
				.select('-_id links')			
				.exec(function (err, user) {
					if (err) return res.send(err);
					res.json(user[0].links);
				})
		})

		// CREATE LINK
		.post(function(req, res) {
				User.findOne({login:req.decoded.login}).populate('links').exec(function (err, user) {				
				if (req.body.tags) {
					tagname = linkfunct.toSplitTags(req.body.tags);
				} else tagname = [];

				var link = new Links({
					  longlink : req.body.longlink,
						shortlink : linkfunct.toShort(),
						description : req.body.description,
						click: 0,
						tags: tagname
					  });
					  
					  user.links.push(link);

					user.save(function (err) {
					if (err) return res.send(err);
		  				
						link.save(function (err) {
						    if (err) return res.send(err);
						   		res.json({ 
			      			success: true, 
			      			message: 'Ваша сокращенная ссылка:    localhost:3000/openlink/' + link.shortlink 
			    			});
						});
					
				})
			})
		});	

  // EDIT LINK
	apiRouter.put('/linkedit/:shortlink', function(req, res) {
		Links.findOne({ shortlink: req.params.shortlink })
			.exec(function (err, link) {
			if (err) res.send(err);
				if (link) {
					if (req.body.description) {
						link.description = req.body.description;
					} else link.description = '';
		  if (req.body.tags) {
					link.tags = linkfunct.toSplitTags(req.body.tags);
					} else link.tags = [];
					link.save(function (err) {
						if (err) return res.send(err);
						res.json({ 
		      				success: true, 
		      				message: 'Ссылка отредактирована!' 
		    			});
					});
				} else res.json({ 
	      				success: false, 
	      				message: 'Отсутствует ссылка для редактирования.' 
	    			});
			})
	});

	// OPEN LINK
	apiRouter.get('/openlink/:shortlink', function(req, res) {
		Links.findOne({ shortlink: req.params.shortlink })
			.populate('links')
	  	.exec(function (err, link) {
				if (err) res.send(err);
				if(link) {
					link.click = link.click + 1;
					link.save(function (err) {
						if (err) return res.send(err);
						res.json(link);
					});
				} else res.json({
					success: false,
				});			
			})
	});	

	return apiRouter;
};