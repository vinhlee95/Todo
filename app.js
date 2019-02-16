const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
require('./server/auth/passport');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
require('./server/routes')(app);

// Error handling
app.use(function(error, req, res, next) {
	res.status(error.status || 500).send({ message: error.message })
})

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;