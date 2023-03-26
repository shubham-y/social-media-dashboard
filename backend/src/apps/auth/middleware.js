const logger = require( '../../config/logger' )
const { comparePassword } = require( '../../utils/password' )
const { User } = require( './model' )
const { signUpSchema, signInSchema } = require( './schema' )

const validateSignUp = async ( req, res, next ) => {
  try {
    await signUpSchema.validate( req.body, { abortEarly: false } )
    return next()
  } catch ( error ) {
    logger.error( 'Error in validateSignUp', error )
    return res.boom.badRequest( 'Unable to validate sign up data' )
  }
}

const isUserAlreadyExist = async ( req, res, next ) => {
  try {
    const user = await User.findOne( { email: req.body.email } )
    if ( user !== null ) {
      return res.boom.forbidden( 'Unable to signup. The email has already been taken' )
    }
    return next()
  } catch ( error ) {
    logger.error( 'Error in isUserAlreadyExist', error )
    return res.boom.badImplementation( 'Unable to authenticate the user' )
  }
}

const validateSignIn = async ( req, res, next ) => {
  try {
    await signInSchema.validate( req.body, { abortEarly: false } )
    return next()
  } catch ( error ) {
    logger.error( 'Error in validateSignIn', error )
    return res.boom.badImplementation( 'Unable to validate sign in data' )
  }
}

const isEmailExist = async ( req, res, next ) => {
  try {
    const userData = await User.findOne( { email: req.body.email } ).select( '+password' )
    if ( userData === null ) {
      return res.boom.unauthorized( 'Invalid user credentials' )
    }
    req.userData = userData
    return next()
  } catch ( error ) {
    logger.error( 'Unable to check email', error )
    return res.boom.badImplementation( 'Unable to check email' )
  }
}

const isPasswordCorrect = async ( req, res, next ) => {
  try {
    const isPasswordCorrect = await comparePassword( req.body.password, req.userData.password )
    if ( !isPasswordCorrect ) {
      return res.boom.unauthorized( 'Invalid user credentials' )
    }
    return next()
  } catch ( error ) {
    logger.error( 'Unable to check password', error )
    return res.boom.badImplementation( 'Unable to check password' )
  }
}

module.exports = {
  validateSignUp,
  validateSignIn,
  isUserAlreadyExist,
  isEmailExist,
  isPasswordCorrect,
}
