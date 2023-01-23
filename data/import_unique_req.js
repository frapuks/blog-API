import { client } from '../app/service/database.js';
import categories from './categories.json' assert {type :"json"};
import posts from './posts.json' assert {type :"json"};

async function seeding(){
    // Seeding categories
    let sqlCategories = `INSERT INTO category (route, label) VALUES `;
    const parametersCategories = [];
    const valuesCategories = [];
    let counterCategories = 0;
    for (const category of categories) {
        parametersCategories.push(`($${counterCategories+=1}, $${counterCategories+=1})`); // ($1, $2)
        valuesCategories.push(category.route);
        valuesCategories.push(category.label);
    }
    sqlCategories += parametersCategories.join(',') + 'RETURNING id, label';
    const resultCategories = await client.query(sqlCategories, valuesCategories);
    const categoriesInserted = resultCategories.rows;

    // seeding posts
    let sqlPosts = `INSERT INTO post (slug, title, excerpt, content, category_id) VALUES `;
    const parametersPosts = [];
    const valuesPosts = [];
    let counterPosts = 0;
    for (const post of posts) {
        parametersPosts.push(`($${counterPosts+=1}, $${counterPosts+=1}, $${counterPosts+=1}, $${counterPosts+=1}, $${counterPosts+=1})`);
        const category = categoriesInserted.find(elem => elem.label === post.category);
        const categoryId = category.id
        valuesPosts.push(post.slug);
        valuesPosts.push(post.title);
        valuesPosts.push(post.excerpt);
        valuesPosts.push(post.content);
        valuesPosts.push(categoryId);
    }
    sqlPosts += parametersPosts.join(',');
    await client.query(sqlPosts, valuesPosts);
}

await seeding();

client.end();