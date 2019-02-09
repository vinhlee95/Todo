const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;

module.exports = (app) => {
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Welcome to the API',
	}));

	// Get all todos
	app.get('/api/todos', todosController.get);

	// Create todos
	app.post('/api/todos', todosController.create);

	// Get a todo
	app.get('/api/todos/:todoId', todosController.retrieve);

	// Update a todo
	app.put('/api/todos/:todoId', todosController.update);

	// Create todoItem
	app.post('/api/todos/:todoId/items', todoItemsController.create)

}