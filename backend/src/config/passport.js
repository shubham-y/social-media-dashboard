const passport = require( 'passport' )
const FBStrategy = require( 'passport-facebook' ).Strategy

const logger = require( './logger' )

try {
  passport.use(
    new FBStrategy(
      {
        clientID: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_CLIENT_SECRET,
        callbackURL: `${process.env.API_URL}/api/v1/auth/facebook/callback`,
      },
      ( accessToken, refreshToken, profile, done ) => {
        return done( null, accessToken, profile )
      },
    ),
  )
} catch ( err ) {
  logger.error( 'Error initialising passport:', err )
}
