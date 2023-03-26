const express = require( 'express' )
const passport = require( 'passport' )

const { signup, signin, signout, facebookConnect } = require( './controller' )
const {
  isEmailExist,
  isPasswordCorrect,
  isUserAlreadyExist,
  validateSignUp,
  validateSignIn,
} = require( './middleware' )

const authRouter = express.Router()

authRouter.post( '/signup', validateSignUp, isUserAlreadyExist, signup )
authRouter.post( '/signin', validateSignIn, isEmailExist, isPasswordCorrect, signin )
authRouter.get( '/signout', signout )

authRouter.get( '/facebook', passport.authenticate( 'facebook', { scope: [ 'email', 'public_profile', 'user_friends', 'user_posts' ] } ) )
authRouter.get( '/facebook/callback', facebookConnect )

module.exports = authRouter
