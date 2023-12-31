var config = require('../config');
var express = require('express');
var path = require('path');
var router = express.Router();

module.exports = function(db, logger){

	router.get('/CV', function(req, res, next) {
		res.sendFile(path.join(config.server.appDirectory, config.server.publicDirectory, config.server.CV));
	});
	
	router.get('/Dissertation', function(req, res, next) {
		res.sendFile(path.join(config.server.appDirectory, config.server.publicDirectory, config.server.Dissertation));
	});

	router.post('/mail', function(req, res, next) {
		res.sendFile(path.join(config.server.appDirectory, config.server.routesDirectory, config.server.mail));
	});

	router.get('/about', function(req, res, next) {
		res.redirect('/#about');
	});

	router.get('/skills', function(req, res, next) {
		res.redirect('/#skills');
	});

	router.get('/projects', function(req, res, next) {
		res.redirect('/#projects');
	});

	router.get('/timeline', function(req, res, next) {
		res.redirect('/#timeline');
	});

	router.get('/experience', function(req, res, next) {
		res.redirect('/#timeline');
	});

	router.get('/contact', function(req, res, next) {
		res.redirect('/#contact');
	});
	
	return router;
}