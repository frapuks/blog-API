-- Verify oblog:1.create_tables on pg

BEGIN;

SELECT (id, category_id, slug, title, excerpt, content) FROM post;
SELECT (id, route, label) FROM category;

ROLLBACK;
