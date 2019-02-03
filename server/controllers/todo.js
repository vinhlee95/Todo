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
      .catch(error => res.status(400).send(error));
	},
};