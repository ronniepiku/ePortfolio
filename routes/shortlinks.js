var config = require('../config');
var express = require('express');
var router = express.Router();

module.exports = function(db, logger){

	router.get('/CV', function(req, res, next) {
		res.sendFile('/doc/Ronald_Piku_CV.pdf' , { root: __dirname });
	});

	router.get('/Dissertation', function(req, res, next) {
		res.sendFile('/doc/Ronald_Piku_Dissertation.pdf', { root: __dirname });
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