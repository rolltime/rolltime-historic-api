## Rolltime Historic API
The historic API uses a bike station id as a REST endpoint and, together with a `date` parameter, will query the PostgreSQL instance for the specified station data. If no `date` is provided, the API will return data for the current date (server time).
[![Build Status](https://travis-ci.org/rolltime/rolltime-historic-api.svg)](https://travis-ci.org/rolltime/rolltime-historic-api)

## Examples
The following will query the endpoint `/station` together with the station id `442`. It also provides the `date=2015-06-11` parameter, specifying the date.

```shell
$ curl localhost:2000/station/442?date=2015-06-11
```

The result will be:

```json
{
    "success": true,
    "message": "Data queried successfully.",
    "station": "442",
    "date": "2015-06-11",
    "data": {
        "count": 94,
        "result": [
          {
            "id": 442,
            "availabledocks": 50,
            "totaldocks": 51,
            "availablebikes": 0,
            "lastcommunicationtime": "2015-09-11 09:18",
            "executiontime": "2015-09-11 09:21",
            "day": "2015-09-11",
            "week": 37,
            "weekday": 4,
            "availabledocksratio": 0.980392,
            "availablebikesratio": 0
          },
          ...
        ]
    }
}

```

## Docker Usage
[![](https://badge.imagelayers.io/luiscape/rolltime-historic-api:latest.svg)](https://imagelayers.io/?images=luiscape/rolltime-historic-api:latest 'Get your own badge on imagelayers.io')

In order to be run successfully, the `Dockerfile` needs to be linked to a `postgres` container and ran with the `postgres` variables:

* `POSTGRES_DB_NAME`: database name.
* `POSTGRES_DB_USER`: database user name.
* `POSTGRES_DB_PASSWORD`: database password.

Without those, the application won't run.
