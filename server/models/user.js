const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
		password: DataTypes.STRING,
		email: DataTypes.STRING,
		avatar_url: DataTypes.STRING,
	}, {
		indexes: [
			{
				unique: true,
				fields: ['email', 'username']
			}
		]
	});

	User.beforeSave(async (user, options) => {
		try {
			const hash = await bcrypt.hash(user.password, saltRounds);
			user.password = hash;
		} catch(error) {
			res.status(500).send('There is some problems saving your password. ')
		}
	});

	User.prototype.isValidPassword = async (providedPassword, userPassword) => {
		const compare = await bcrypt.compare(providedPassword, userPassword);
		return compare;
	}

  User.associate = function(models) {
    User.hasMany(models.Todo, {
			as: 'todos'
		})
  };
  return User;
};