## Rolltime Historic API
The current version of the API simply exposes the complete `PostgreSQL` insance in an internal TSL address. Future versions of this API will probably have more refined output methods (such as calculations and specific summaries). This version is appropriate for the time being.

## Docker Usage
In order to be run successfully, the `Dockerfile` needs to be linked to a `postgres` container and ran with the `postgres` variables:

* `POSTGRES_DB_NAME`: database name.
* `POSTGRES_DB_USER`: database user name.
* `POSTGRES_DB_PASSWORD`: database password.

Without those, the container will fail to run.
