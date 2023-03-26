const express = require( 'express' )

const { signup, signin, signout } = require( './controller' )
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

module.exports = authRouter
