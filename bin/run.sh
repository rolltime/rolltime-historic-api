#!/bin/bash

#
# Run PostgREST with all the
# database config options.
#
postgrest --db-host $POSTGRES_PORT_5432_TCP_ADDR \
          --db-name $POSTGRES_DB_NAME \
          --db-user $POSTGRES_DB_USER \
          --db-pass $POSTGRES_DB_PASSWORD \
          --db-pool 200 \
          --anonymous postgres \
          --port 3000 \
          --v1schema public
