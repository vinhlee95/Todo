const passport = require('passport');
const jwt = require('jsonwebtoken');

// Controllers
const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const userController = require('../controllers').users;

module.exports = (app) => {
	app.post('/api/signup', passport.authenticate('signup', { session: false }), userController.signup);

	app.post('/api/login', userController.login);

	//Displays information tailored according to the logged in user
	app.get('/api', passport.authenticate('jwt', {session: false}), (req, res, next) => {
		//We'll just send back the user details and the token
		res.json({
			message : 'You made it to the secure route',
			user : req.user,
			token : req.query.secret_token
		})
	});

	// Get all todos
	app.get('/api/todos', todosController.get);

	// Create todos
	app.post('/api/todos', todosController.create);

	// Get a todo
	app.get('/api/todos/:todoId', todosController.retrieve);

	// Delete a todo
	app.delete('/api/todos/:todoId', todosController.delete);

	// Update a todo
	app.put('/api/todos/:todoId', todosController.update);

	// Create todoItem
	app.post('/api/todos/:todoId/items', todoItemsController.create)

}