-- Revert oblog:2.add_domains from pg

BEGIN;


ALTER TABLE category ALTER COLUMN route TYPE text;
DROP DOMAIN route;


ALTER TABLE post ALTER COLUMN slug TYPE text;
DROP DOMAIN slug;


COMMIT;
