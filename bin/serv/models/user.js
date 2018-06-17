var mongoose     = require('mongoose');
var bcrypt 		 = require('bcrypt-nodejs');

var UserSchema   = new mongoose.Schema({
	name	: { type: String, required: true},
	login   : { type: String, required: true, index: { unique: true, sparse: true }},
	password: { type: String, required: true, select: false },
	links 	: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Links' }]
});

// hash the password
UserSchema.pre('save', function(next) {
	var user = this;
	// hash the password only, user is new
	if (!user.isModified('password')) return next();
	// generate
	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) return next(err);
		user.password = hash;
		next();
	});
});

// given password with the database hash
UserSchema.methods.comparePassword = function(password) {
	var user = this;
	return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);