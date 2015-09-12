//
// Collects all the string
// pieces from environment variables.
//
module.exports = {
  'url': 'postgresql://' +
    process.env.POSTGRES_DB_USER + ':' +
    process.env.POSTGRES_DB_PASSWORD + '@' +
    process.env.POSTGRES_PORT_5432_TCP_ADDR + ':5432/' +
    process.env.POSTGRES_DB_NAME
}
