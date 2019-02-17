/**
 * Config passport local strategy for signup and login
 * This will be plugged into certain routes for authentication
 */

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
//We use this to extract the JWT sent by the user
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models').User;

//This verifies that the token sent by the user is valid
let options = {}
options.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken()
options.secretOrKey = 'login_token'

passport.use(new JWTstrategy(options, async (token, done) => {
  try {
    //Pass the user details to the next middleware
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));

//Create a passport middleware to handle user registration
passport.use('signup', new localStrategy({
  usernameField : 'email',
  passwordField : 'password'
}, async (email, password, done) => {
	try {
		//Save the information provided by the user to the the database
		const user = await User.create({ email, password });
		//Send the user information to the next middleware
		return done(null, user, { message: 'Successfully created user' });
	} catch (error) {
		done(error);
	}
}));

//Create a passport middleware to handle User login
passport.use('login', new localStrategy(
	{
		usernameField : 'email',
		passwordField : 'password'
	},
	async (email, password, done) => {
		try {

			//Find the user associated with the email provided by the user
			let user = await User.findOne({
				where: {
					email: email
				}
			});

			if(!user) {
				return done(null, null, { message: 'User not found'});
			}

			// Validate password
			const validate = await user.isValidPassword(password, user.dataValues.password);

			if( !validate ){
				return done(null, false, { message : 'Wrong Password'});
			}

			//Send the user information to the next middleware
			return done(null, user, { message : 'Logged in Successfully'});
		} catch (error) {
			return done(error);
		}
	}
));