-- Revert oblog:1.create_tables from pg

BEGIN;

DROP TABLE post, category;

COMMIT;
