var mongoose     = require('mongoose');
var bcrypt 		 = require('bcrypt-nodejs');
var User      	 = require('./user');

var LinksSchema = new mongoose.Schema({
	longlink 			: { type: String, required: true, ref: 'User' },
	shortlink			: { type: String, ref: 'User' },
	description     	: { type: String, ref: 'User' },
	click     			: { type: Number, ref: 'User' },
	tags				: { type: Array, ref: 'User' }
});

module.exports = mongoose.model('Links', LinksSchema);