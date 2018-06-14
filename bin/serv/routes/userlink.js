// var bodyParser = require('body-parser');
var User       = require('../models/user');
var Links      = require('../models/links');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');
var linkfunct	 = require('../linkfunct');

// perem for creating tokens
var perem = config.perem;

module.exports = function(app, express) {

	var apiRouter = express.Router();

	// authenticate a user
	apiRouter.post('/login', function(req, res) {

	  User.findOne({
	    login: req.body.login
	  }).select('name login password').exec(function(err, user) {
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

	        // if user is found and password is right
	        // create a token
	        var token = jwt.sign({
	        	name: user.name,
	        	login: user.login
	        }, perem, {
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

	apiRouter.get('/', function(req, res) {
		res.json({ message: 'Добро пожаловать!' });	
	});

	apiRouter.route('/linkcreate')
   
		
		.post(function(req, res) {
				User.findOne({login:"123"}).populate('links').exec(function (err, user) {
				// {login:req.decoded.login}
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
			      			message: 'Ваша сокращенная ссылка localhost:3000/redirect/' + link.shortlink 
			    			});
						});
					
				})
			})
		});	

	// api endpoint to get user information
	apiRouter.get('/me', function(req, res) {
		res.send(req.decoded);
	});

	return apiRouter;
};