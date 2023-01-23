-- Revert oblog:3.delete_constraint_on_delete_cascade from pg

BEGIN;

ALTER TABLE post
    DROP CONSTRAINT post_category_id_fkey;

ALTER TABLE post
    ALTER COLUMN category_id DROP NOT NULL;

ALTER TABLE post
    ADD CONSTRAINT post_category_id_fkey
    FOREIGN KEY (category_id)
    REFERENCES category(id)
    ON DELETE CASCADE;

COMMIT;
