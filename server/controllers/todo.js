const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

module.exports = {
	get(req, res) {
		const userId = req.user.id;
		return Todo
			.findAll(
				{
					where: { UserId: userId }
				},
				{
					include: [{
						model: TodoItem,
						as: 'items',
					}],
				}
			)
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
				UserId: req.user.id,
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
					try {
						updatedTodo.update({ title });
						res.status(201).send(updatedTodo);
					} catch(error) {
						res.status(500).send(error);
					}
				}
			} else {
				res.status(404).send('Todo not found');
			}
		} catch(error) {
			res.status(500).send(error);
		}
	},

	async delete(req, res) {
		try {
			const deletedTodo = await Todo.findByPk(req.params.todoId);
			if(deletedTodo) {
				try {
					deletedTodo.destroy();
					res.status(200).send('Successed')
				} catch(error) {
					res.status(500).send(error);
				}

			} else {
				res.status(404).send('Todo not found')
			}
		} catch(error) {
			res.status(500).send(error);
		}
	}
};