const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

module.exports = {
	get(req, res) {
		return Todo
			.findAll({
				include: [{
					model: TodoItem,
					as: 'items',
				}],
			})
			.then(todos => res.status(200).send(todos))
			.catch(error => {
				console.log(error);
				res.status(400).send(error);
			});
	},

  create(req, res) {
    return Todo
      .create({
        title: req.body.title,
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(500).send(error));
	},

	async retrieve(req, res) {
		try {
			const retrievedTodo = await Todo.findByPk(
				req.params.todoId,
				{
					include: [{
						model: TodoItem,
						as: 'items'
					}]
				}
			);
			if(retrievedTodo) {
				res.status(201).send(retrievedTodo)
			} else {
				res.status(404).send('Todo not found')
			}
		} catch(error) {
			res.status(500).send(error)
		}
	},

	async update(req, res) {
		try {
			const updatedTodo = await Todo.findByPk(
				req.params.todoId,
				{
					include: [{
						model: TodoItem,
						as: 'items'
					}]
				}
			);

			if(updatedTodo) {
				const { title } = req.body;

				if(!title) {
					res.status(400).send('Bad title');
				} else {
					updatedTodo.update({ title });
					res.status(201).send(updatedTodo);
				}
			} else {
				res.status(404).send('Todo not found');
			}
		} catch(error) {
			res.status(500).send(error);
		}
	}
};