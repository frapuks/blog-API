import categories from './categories.json' assert {type :"json"};
import posts from './posts.json' assert {type :"json"};

import { client } from '../app/database.js';

for (const category of categories) {
    const sql = `
        INSERT INTO category (route, label)
        VALUES ($1, $2)
        RETURNING id`
    const values = [category.route, category.label];
    const result = await client.query(sql, values);
    const categoryRow = result.rows[0];
    const category_id = categoryRow.id;

    for (const post of posts) {
        if (post.category === category.label) {
            const sql = `
                INSERT INTO post (slug, title, excerpt, content, category_id)
                VALUES ($1, $2, $3, $4, $5)`
            const values = [post.slug, post.title, post.excerpt, post.content, category_id];
            await client.query(sql, values);
        }
    }
}
client.end();