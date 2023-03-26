const express = require( 'express' )
const helmet = require( 'helmet' )
const cors = require( 'cors' )
const xss = require( 'xss-clean' )
const compression = require( 'compression' )
const dotenv = require( 'dotenv' )
const morgan = require( 'morgan' )
const boom = require( 'express-boom' )

const routes = require( './router' )
const { connectDb } = require( './config/db' )
const { corsOptions } = require( './config/corsOptions' )
const { httpLogFormatter } = require( './config/morgan' )

const createApp = () => {
  const app = express()

  // initializing env variables
  dotenv.config()

  // error middleware
  app.use( boom() )

  // initializing mongoDB
  connectDb()

  // set security HTTP headers
  app.use( helmet() )

  // add cors
  app.use( cors( corsOptions ) )

  // sanitize request data
  app.use( xss() )

  // parse json request body
  app.use( express.json() )

  // parse urlencoded request body
  app.use( express.urlencoded( { extended: true } ) )

  // gzip compression
  app.use( compression() )

  // http logger
  app.use( morgan( httpLogFormatter ) )

  // setup routes
  app.use( '/', routes )

  // use global error handler
  app.use( ( err, req, res, next ) => {
    res.boom.notFound( err )
  },
  )

  return app
}

const app = createApp()

module.exports = app