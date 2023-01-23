-- Revert oblog:4.add_constraint_unique from pg

BEGIN;

ALTER TABLE category
    DROP CONSTRAINT route_unique;

ALTER TABLE category
    DROP CONSTRAINT label_unique;

ALTER TABLE post
    DROP CONSTRAINT slug_unique;

COMMIT;
