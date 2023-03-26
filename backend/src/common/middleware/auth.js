const { getToken, verifyAuthToken } = require( '../../apps/auth/utils' )
const logger = require( '../../config/logger' )

const authenticationMiddleware = async function ( req, res, next ) {
  try {
    const token = getToken( req )
    if ( token === null ) {
      return res.boom.unauthorized( 'Unauthenticated user' )
    }

    const decodedToken = await verifyAuthToken( token ).catch( ( error ) => {
      logger.error( error )
      return res.boom.forbidden( 'Access forbidden' )
    } )
    req.userData = {
      id: decodedToken.user_id,
    }
    return next()
  } catch ( error ) {
    logger.error( `Error while authenticating: ${error}` )
    return res.boom.badImplementation( 'Unable to authenticate the user' )
  }
}

module.exports = {
  authenticationMiddleware,
}
