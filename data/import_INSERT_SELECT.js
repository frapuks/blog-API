import { client } from '../app/service/database.js';
import categories from './categories.json' assert {type :"json"};
import posts from './posts.json' assert {type :"json"};

async function seedCategory(){
    for (const category of categories) {
        const sql = `
            INSERT INTO category (route, label)
            VALUES ($1, $2)`;
        const values = [category.route, category.label];
        await client.query(sql, values);
    }
}

async function seedPosts() {
    for (const post of posts) {
        const sql = `
            INSERT INTO post (slug, title, excerpt, content, category_id)
            VALUES ($1, $2, $3, $4, (
                SELECT id
                FROM category
                WHERE label = $5
            ))`
        const values = [post.slug, post.title, post.excerpt, post.content, post.category];
        await client.query(sql, values);
    }
}

await seedCategory();
await seedPosts();

client.end();