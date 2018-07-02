module.exports = {
	'port': process.env.PORT || 3000,
	  mongoURI : {
		  development: 'mongodb://localhost/urlshortener',
		  test: 'mongodb://localhost/urlshortener-test'
	  },
  	// for creating tokens
	'tokensecret': 'tokensecret'
};