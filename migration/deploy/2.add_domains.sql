-- Deploy oblog:2.add_domains to pg

BEGIN;


CREATE DOMAIN route AS text CHECK( VALUE ~ '^/[a-z0-9]*$' );
ALTER TABLE category ALTER COLUMN route TYPE route;


CREATE DOMAIN slug AS text CHECK( VALUE ~ '^([a-z0-9]+-)*[a-z0-9]+$' );
ALTER TABLE post ALTER COLUMN slug TYPE slug;


COMMIT;
