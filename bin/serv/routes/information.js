var Links      = require('../models/links');

module.exports = function(app, express) {

	var infoRouter = express.Router();

	//all links
	infoRouter.get('/', function(req, res) {
		Links
			.find()
				.exec(function (err, link) {
				if (err) res.send(err);
				if (link) {
					res.json(link);
				} else res.json({ 
	      				success: false, 
	      				message: 'Ссылок нет.' 
	    			});
			})
	});

	//shortlinks
	infoRouter.get('/json/:short_link', function(req, res) {
		Links
			.findOne({ shortlinkname: req.params.short_link })
			.exec(function (err, link) {
				if (err) res.send(err);
				if (link) {
					res.json(link);
				} else res.json({ 
	      				success: false, 
	      				message: 'Нет информации.' 
	    			});
			})
	});
	return infoRouter;
};