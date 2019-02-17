module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
	});

	Todo.associate = (models) => {
		Todo.hasMany(models.TodoItem, {
			as: 'items',
		})

		Todo.belongsTo(models.User, {
			onDelete: 'CASCADE',
			allowNull: false,
		})
	};

  return Todo;
};