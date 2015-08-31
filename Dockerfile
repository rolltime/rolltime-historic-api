############################################################
# DB API support for the Rolltime family of applications.
# From: https://github.com/begriffs/postgrest/wiki/Docker
############################################################

FROM centos

RUN yum install -y tar wget postgresql-devel git make

ENV POSTGREST_VERSION 0.2.11.0

RUN \
  wget http://bin.begriffs.com/dbapi/heroku/postgrest-${POSTGREST_VERSION}.tar.xz \
  && tar --xz -xvf postgrest-${POSTGREST_VERSION}.tar.xz \
  && mv postgrest-${POSTGREST_VERSION} /usr/local/bin/postgrest

RUN \
  git clone https://github.com/rolltime/rolltime-historic-api

WORKDIR "/rolltime-historic-api"

CMD ["make", "run"]

EXPOSE 3000
