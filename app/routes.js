var moment = require('moment')

module.exports = function (app, client, done, Config) {
  //
  // Internal function to handle
  // errors with the database queries.
  //
  var _handle = function (err, callback) {
    //
    // No errors occurred.
    // Continue with the request.
    //
    if (!err) {
      var payload = {
        'succes': true,
        'message': 'Made query successfully to database'
      }
      return payload
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

    payload = {
      'success': false,
      'message': 'Failed to make query to database.',
      'error': err
    }
    return payload

  }

  //
  // Internal function to validate dates.
  //
  // var _validate_date = function (date) {}

  //
  // Query specific memory object.
  //
  var payload = {}
  var stationObject = {}

  //
  // Provide the status of the service.
  //
  app.get('/status', function (req, res) {
    payload = {
      'success': true,
      'version': Config.version,
      'message': Config.message,
      'repository': Config.repository,
      'maintainer': Config.maintainer
    }
    res.send(payload)
  })

  app.param('id', function (req, res, next, data) {
    if (data === undefined) {
      payload = {
        'success': false,
        'message': 'Please provide resource ID.'
      }
      res.send(payload)
    }

    stationObject.id = data
    next()

  })

  app.all('/station/:id', function (req, res) {
    //
    // If date parameter is not provided
    // assume the query is for the current date.
    // Also, allows room for better validation.
    //
    if (req.body.date === undefined) {
      stationObject.date = moment().format('YYYY-MM-DD')
    } else {
      stationObject.date = req.body.date
    }

    console.log(req.body)

    var statement = "SELECT * FROM metric WHERE day='" +
      stationObject.date +
      "'AND id=" +
      stationObject.id

    client.query(statement, function (err, result) {
      if (_handle(err)['success'] === false) {
        payload = {
          'success': false,
          'message': 'Query to database failed.',
          'error': err
        }
        res.send(payload)
      } else {
        payload = {
          'success': true,
          'message': 'Data queried successfully.',
          'station': stationObject.id,
          'date': stationObject.date,
          'data': {
            'count': result.rowCount,
            'result': result.rows
          }
        }
        res.send(payload)
      }
    })

  })

}
