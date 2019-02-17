/**
 * User controller
 */

const passport = require('passport');
const jwt = require('jsonwebtoken');

// Utils
const {createErrorMessage} = require('../utils');

module.exports = {

	/**
	 * Sign user up
	 * Just send back the user as passport already handled signing up process
	 *
	 */
	async signup(req, res, next) {
		passport.authenticate('signup', async (error, user, info) => {
			try {
				if(error) {
					return next(error);
				}

				return res.status(201).send({
					user,
					message: info.message,
				});
			} catch(error) {
				return next(error);
			}
		})(req, res, next)
	},


	/**
	 * Log user in
	 *
	 */
	async login(req, res, next) {
		passport.authenticate('login', async (error, user, info) => {
			try {
				if(error){
					const err = createErrorMessage(500, 'Something went wrong!');
					return next(err)
				}

				if(!user) {
					const error = createErrorMessage(404, info.message);
					return next(error)
				}

				req.login(user, { session : false }, async (error) => {
					if( error ) return next(error)

					const body = { id: user.id, email : user.email };
					const token = jwt.sign({ user : body }, 'login_token');
					//Send back the token to the user
					return res.json({ token });
				});
			} catch (error) {
				return next(error);
			}
		})(req, res, next);
	}
}