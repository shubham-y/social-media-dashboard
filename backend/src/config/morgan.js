const logger = require( './logger' )

function httpLogFormatter ( tokens, req, res ) {
  const level = res.statusCode >= 400 ? 'error' : 'info'
  const message = [
    tokens['remote-addr']( req, res ),
    tokens['remote-user']( req, res ) || '-',
    `[${tokens.date( req, res, 'clf' )}]`,
    `"${tokens.method( req, res )} ${tokens.url( req, res )} HTTP/${tokens['http-version']( req, res )}"`,
    tokens.status( req, res ),
    tokens.res( req, res, 'content-length' ) || '-',
    `"${tokens.referrer( req, res ) || '-'}"`,
    `"${tokens['user-agent']( req, res )}"`,
  ].join( ' ' )
  logger.log( level, message )
}

module.exports = {
  httpLogFormatter,
}
