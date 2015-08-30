############################################################
# DB API support for the Rolltime family of applications.
# From: https://github.com/begriffs/postgrest/wiki/Docker
############################################################

FROM centos

RUN yum install -y tar wget postgresql-devel

ENV POSTGREST_VERSION 0.2.11.0

RUN wget http://bin.begriffs.com/dbapi/heroku/postgrest-${POSTGREST_VERSION}.tar.xz
RUN tar --xz -xvf postgrest-${POSTGREST_VERSION}.tar.xz
RUN mv postgrest-${POSTGREST_VERSION} /usr/local/bin/postgrest

CMD postgrest --db-host $POSTGRES_PORT_5432_TCP_ADDR \
              --db-port 5432 \
              --db-name rolltime \
              --db-user rolltime \
              --db-pass rolltime \
              --db-pool 200 \
              --anonymous postgres \
              --port 3000 \
              --v1schema public

EXPOSE 3000
