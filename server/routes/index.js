const passport = require('passport');

// Controllers
const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const authController = require('../controllers').auth;

module.exports = (app) => {
	app.post('/api/signup', authController.signup);

	app.post('/api/login', authController.login);

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
	app.get('/api/todos', passport.authenticate('jwt', {session: false}), todosController.get);

	// Create todos
	app.post('/api/todos', passport.authenticate('jwt', {session: false}), todosController.create);

	// Get a todo
	app.get('/api/todos/:todoId', todosController.retrieve);

	// Delete a todo
	app.delete('/api/todos/:todoId', todosController.delete);

	// Update a todo
	app.put('/api/todos/:todoId', todosController.update);

	// Create todoItem
	app.post('/api/todos/:todoId/items', todoItemsController.create)

}