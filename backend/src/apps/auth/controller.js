const httpStatus = require( 'http-status' )
const passport = require( 'passport' )

const logger = require( '../../config/logger' )
const { hashPassword } = require( '../../utils/password' )
const { User } = require( './model' )
const { generateAuthToken } = require( './utils' )

const signup = async ( req, res, next ) => {
  try {
    const hashedPassword = await hashPassword( req.body.password )
    const user = await User.create( {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    } )

    return res.status( httpStatus.OK ).json( { user } )
  } catch ( error ) {
    logger.error( 'Error in signup', error )
    return res.boom.badImplementation( 'Unable to signup' )
  }
}

const signin = async ( req, res, next ) => {
  try {
    const token = await generateAuthToken( {
      user_id: req.userData.id,
    } )
    const user = {
      id: req.userData.id,
      name: req.userData.name,
      email: req.body.email,
      created_at: req.userData.created_at,
      updated_at: req.userData.updated_at,
    }
    const smdUiUrl = new URL( process.env.UI_URL )
    res.cookie( process.env.COOKIE_NAME, token, {
      domain: smdUiUrl.hostname,
      expire: new Date( Date.now() + process.env.TOKEN_TTL * 1000 ),
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    } )

    return res.status( httpStatus.OK ).json( { token, user } )
  } catch ( error ) {
    logger.error( 'Error in signin', error )
    return res.boom.badImplementation( 'Unable to signin' )
  }
}

const signout = ( req, res, next ) => {
  try {
    const smdUiUrl = new URL( process.env.UI_URL )

    res.clearCookie( process.env.COOKIE_NAME, {
      domain: smdUiUrl.hostname,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    } )
    return res.status( httpStatus.NO_CONTENT ).json()
  } catch ( error ) {
    logger.error( 'Error in signout', error )
    return res.boom.badImplementation( 'Unable to signout' )
  }
}

const facebookConnect = ( req, res, next ) => {
  let userData

  try {
    return passport.authenticate( 'facebook', { session: false }, async ( err, accessToken, user ) => {
      if ( err ) {
        logger.error( err )
        return res.boom.unauthorized( 'User cannot be authenticated' )
      }

      userData = {
        facebook_id: user.username,
        facebook_display_name: user.displayName,
        tokens: {
          facebookAccessToken: accessToken,
        },
      }

      return res.json( { userData } )
    } )( req, res, next )
  } catch ( err ) {
    logger.error( err )
    return res.boom.badImplementation( 'Error in facebookConnect' )
  }
}

module.exports = {
  signup,
  signin,
  signout,
  facebookConnect,
}
