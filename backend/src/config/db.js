const mongoose = require( 'mongoose' )

const logger = require( './logger' )

const connectDb = async () => {
  try {
    const mongoClient = await mongoose.connect( 'mongodb://root:mongodbPass@smd-mongodb:27017', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      directConnection: true,
    } )
    logger.info( `MongoDB Connected: ${mongoClient.connection.host}` )
  } catch ( error ) {
    logger.error( `Error: ${error.message}` )
    process.exit( 1 )
  }
}

module.exports = {
  connectDb,
}
