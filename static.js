var express = require('express');
var serveIndex = require('serve-index');
var path = require('path');
var fs = require('fs');

var app = express();
var logger = require('winston');

logger.stream = {
  write: function (message) {
    logger.info(message);
  }
};

app.use(logger('dev', { stream: logger.stream }));

var location = process.argv[2] || '.';
location = path.join(__dirname, location);
logger.info('Static hosting: ' + location);

// Serve static files
app.use(express.static(location));

// Serve directory listings
app.use(serveIndex(location, { icons: true }));

app.use(function (err, req, res, next) {
  if (!err.status) {
    console.error(err);
    throw err;
  }
  res.status(err.status || 500);
  res.send('<b>' + err.status + ':</b> ' + err.message);
});

module.exports = app;