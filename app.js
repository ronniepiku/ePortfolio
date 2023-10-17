var config = require('./config');
var express = require('express');
var serveIndex = require('serve-index');
var path = require('path');
var fs = require('fs');
var winston = require('winston');
var morgan = require('morgan');


function create(db) {

	app = express();

	const logger = winston.createLogger({
		level: 'info',
		format: winston.format.simple(),
		transports: [
		  new winston.transports.Console(),
		  new winston.transports.File({ filename: 'app.log' }),
		],
	  });

	  console.log('Resolved routes directory:', __dirname, config.server.routesDirectory);
	  console.log('Resolved CV directory:', config.server.CV);
	  console.log('Resolved Dissertation directory:', config.server.Dissertation);

	app.use(morgan('combined', { stream: { write: message => logger.info(message) } }));
    
	// Configure paths
	app.use('/', require(path.join(__dirname, config.server.routesDirectory, 'shortlinks'))(db, logger));
	app.use('/CV', require(path.join(__dirname, config.server.routesDirectory, 'CV'))(db, logger));
    app.use('/Dissertation', require(path.join(__dirname, config.server.routesDirectory, 'Dissertation'))(db, logger));
	app.use(express.static(path.join(__dirname, config.server.publicDirectory)));
	
	// Catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

    app.use(function(err, req, res, next) {
    	if (!err.status) {
    		logger.error(err);
    		throw err;
    	}
    	res.status(err.status || 500);
    	res.send('<b>' + err.status + ':</b> ' + err.message);
    });
    
	app.set('logger', console);
	return app;
}

module.exports = create;
