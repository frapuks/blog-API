-- Deploy oblog:4.add_constraint_unique to pg

BEGIN;

ALTER TABLE category
    ADD CONSTRAINT route_unique UNIQUE (route);
ALTER TABLE category
    ADD CONSTRAINT label_unique UNIQUE (label);
ALTER TABLE post
    ADD CONSTRAINT slug_unique UNIQUE (slug);

COMMIT;
