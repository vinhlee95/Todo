/**
 * User controller
 */

const passport = require('passport');
const User = require('../models/user');

// Utils
const {createErrorMessage} = require('../utils');

module.exports = {

	/**
	 * Sign user up
	 * Just send back the user as passport already handled signing up process
	 *
	 */
	async signup(req, res) {
		res.json({
			message : 'Signup successful',
			user : req.user
		});
	},


	async login(req, res, next) {
		passport.authenticate('login', async (err, user, info) => {
			try {
				if(err){
					const error = createErrorMessage(500, 'Something went wrong!');
					return next(error)
				}

				if(!user) {
					const error = createErrorMessage(404, info.message);
					return next(error)
				}

				req.login(user, { session : false }, async (error) => {
					if( error ) return next(error)
					//We don't want to store the sensitive information such as the
					//user password in the token so we pick only the email and id
					const body = { _id : user._id, email : user.email };
					//Sign the JWT token and populate the payload with the user email and id
					const token = jwt.sign({ user : body },'top_secret');
					//Send back the token to the user
					return res.json({ token });
				});
			} catch (error) {
				return next(error);
			}
		})(req, res, next);
	}
}