var config = require('./config');
var express = require('express');
var serveIndex = require('serve-index');
var path = require('path');
var fs = require('fs');

function create(db) {

	app = express();
    
	// Configure paths
	app.use('/', require(path.join(__dirname, config.server.routesDirectory, 'index'))(db, logger));
	app.use('/', require(path.join(__dirname, config.server.routesDirectory, 'shortlinks'))(db, logger));
	app.use('/schedule', require(path.join(__dirname, config.server.routesDirectory, 'schedule'))(db, logger));
	app.use('/mail', require(path.join(__dirname, config.server.routesDirectory, 'mail'))(db, logger));
	app.use('/analytics', require(path.join(__dirname, config.server.routesDirectory, 'analytics'))(db, logger));
	app.use('/analytics2', require(path.join(__dirname, config.server.routesDirectory, 'analytics2'))(db, logger));
	app.use('/map', require(path.join(__dirname, config.server.routesDirectory, 'map'))(db, logger));
	app.use('/api/viewdata', require(path.join(__dirname, config.server.routesDirectory, 'api/viewdata'))(db, logger));
	app.use('/api/viewdataanalysis', require(path.join(__dirname, config.server.routesDirectory, 'api/viewdataanalysis'))(db, logger));
	app.use('/CV', require(path.join(__dirname, config.server.routesDirectory, 'CV'))(db, logger));
    app.use('/Dissertation', require(path.join(__dirname, config.server.routesDirectory, 'Dissertation'))(db, logger));
	app.use('/api/wiki', require(path.join(__dirname, config.server.routesDirectory, 'api/wiki'))(db, logger));
	app.use('/api/collage', require(path.join(__dirname, config.server.routesDirectory, 'api/collage'))(db, logger));
	app.use('/api/ping', require(path.join(__dirname, config.server.routesDirectory, 'api/ping'))(db, logger));
    
	app.use('/dashboard', require(path.join(__dirname, config.server.routesDirectory, 'dashboard/index'))(db, logger));
	app.use('/dashboard/collage', require(path.join(__dirname, config.server.routesDirectory, 'dashboard/collage'))(db, logger));
	app.use('/dashboard/gas', require(path.join(__dirname, config.server.routesDirectory, 'dashboard/gas'))(db, logger));
	app.use('/misc', require(path.join(__dirname, config.server.miscDirectory))(db, logger));
	app.use('/ping', require(path.join(__dirname, config.server.routesDirectory, 'ping'))(db, logger));

    app.use('/files', function(req, res, next) {
        if (fs.lstatSync(path.join(__dirname, config.server.publicDirectory, decodeURI(req.url))).isFile()) {
            res.redirect(req.url);
        }
        else {
            serveIndex(path.join(__dirname, config.server.publicDirectory), { icons: true })(req, res, next);
        }
    });
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
    
	return [app, logger];

}

module.exports = create;
