var fs = require('fs')

var config = {
		server: {
			port: 80,
			useHttps: false,
			https: {
				keyPath: '',
				certPath: ''
			},
			appDirectory: __dirname,
			publicDirectory: 'public',
			routesDirectory: 'routes',
			CV: 'doc/Ronald_Piku_CV.pdf',
            Dissertation: 'doc/Ronald_Piku_Dissertation.pdf',
		},    
		db: {
			hostname: 'mongodb://ac-xcfmeme-shard-00-00.rfreo6u.mongodb.net:27017',
			mainDb: 'heroku_h5zdpd40',
			useSSL: false,
			required: true,
			authenticate: true,
			authentication: {
	            username: 'admin',
	            password: 'd0gd4ys'
	        },
			collections: {
			  users: 'users',
			  active: 'active',
			  pending: 'pending',
			  inactive: 'inactive',
			  oauthAccessTokens: 'oauthAccessTokens',
			}
		  },
	    
	    remindDelayHours: 24,
	    
	    appClientId: 'app',
	    appClientSecret: 'd0gd4ys',
	    
	    array: array,
	    object: object
}

function array(contents) {
	return {
		type: 'array',
		contents: contents
	}
}

function object(contents) {
	return {
		type: 'object',
		contents: contents
	}
}

module.exports = config;