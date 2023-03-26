const express = require( 'express' )

const authRouter = express.Router()

authRouter.all( '*', ( req, res, next ) => {
  return res.send( 'Auth routes' )
} )

module.exports = authRouter
