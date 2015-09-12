//
// Connects to database and runs server.
//
var fs = require('fs')
var pg = require('pg')
var cors = require('cors')
var morgan = require('morgan')
var express = require('express')
var bodyParser = require('body-parser')
var FileStreamRotator = require('file-stream-rotator')

//
// Configuration variables.
//
var port = process.env.PORT || 2000
var DB = require('./config/db')
var Config = require('./config/dev')

//
// Express application.
//
var app = express()

//
// Connect to the database and
// then start application. This
// handles errors as well.
//
console.log('Attempting database connection to: ' + DB.url)
pg.connect(DB.url, function (err, client, done) {
  var _handle = function (err) {
    //
    // no error occurred, continue with the request
    //
    if (!err) {
      return false
    }

    //
    // An error occurred, remove the client from the connection pool.
    // A truthy value passed to done will remove the connection from the pool
    // instead of simply returning it to be reused.
    // In this case, if we have successfully received a client (truthy)
    // then it will be removed from the pool.
    //
    if (client) {
      done(client)
    }

    console.log('Could not connect to PostgreSQL.')
    console.log(err)
    return true
  }

  //
  // If the handler managed
  // to handle the error correctly,
  // continue. Otherwise, return false.
  //
  if (_handle(err)) {
    return false
  }

  //
  // Setup logger.
  //
  var logDirectory = __dirname + '/log'
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

  var accessLogStream = FileStreamRotator.getStream({
    filename: logDirectory + '/historic-api-%DATE%.log',
    frequency: 'daily',
    verbose: false
  })

  app.use(morgan('combined', {stream: accessLogStream}))

  //
  // Configure CORS and body parser.
  //
  app.use(cors())
  app.use(bodyParser.json({ type: 'application/*+json' }))
  app.use(bodyParser.urlencoded({ extended: false }))

  //
  // Load routes.
  //
  require('./app/routes.js')(app, client, done, Config)

  //
  // Start server.
  //
  console.log('Historic API (' + Config.version + ') running on port ' + port)
  app.listen(port)

})
