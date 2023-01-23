-- Deploy oblog:3.delete_constraint_on_delete_cascade to pg

BEGIN;

ALTER TABLE post
    DROP CONSTRAINT post_category_id_fkey;

ALTER TABLE post
    ALTER COLUMN category_id SET NOT NULL;

ALTER TABLE post
    ADD CONSTRAINT post_category_id_fkey
    FOREIGN KEY (category_id)
    REFERENCES category(id);

COMMIT;
