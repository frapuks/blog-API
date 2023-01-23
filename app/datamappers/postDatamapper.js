import {client} from "../service/database.js";

const postDatamapper = {
    /**
     * récupère tout les posts
     * @returns liste des posts
     */
    async getAll(){
        const sql = `SELECT * FROM post`;
        const result = await client.query(sql);
        return result.rows;
    },

    /**
     * récupère un post
     * @param {*} id id du post
     * @returns détail du post
     */
    async getOne(id){
        const sql = `
            SELECT *
            FROM post
            WHERE id = $1`;
        const values = [id];
        const result = await client.query(sql, values);
        return result.rows[0];
    },

    /**
     * crée un post
     * @param {*} body détails du post à créer
     * @returns détail du post créé
     */
    async create(body){
        const sql = `
            INSERT INTO post (category_id, slug, title, excerpt, content)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`;
        const values = [body.category_id, body.slug, body.title, body.excerpt, body.content];
        const result = await client.query(sql, values);
        return result.rows[0];
    },

    /**
     * récupère tous les posts d'une catégorie
     * @param {*} id id du post
     * @returns liste des posts d'une catégorie
     */
    async getAllByCategorieId(id){
        const sql = `
            SELECT *
            FROM post
            WHERE category_id = $1`;
        const values = [id];
        const result = await client.query(sql, values);
        return result.rows;
    },

    /**
     * Met à jour un post
     * @param {*} id id du post
     * @param {*} body détails du post à update
     * @returns détail du post update
     */
    async update(id, body){
        let counter = 0;
        const parameters = [];
        const values = [];
        for (const prop in body) {
            parameters.push(`${prop}=$${counter+=1}`);
            values.push(body[prop]);
        }
        values.push(id);
        const sql = `
            UPDATE post
            SET ${parameters.join(',')}
            WHERE id = $${counter+=1}
            RETURNING *`;
        const result = await client.query(sql, values);
        return result.rows[0];
    },
    // async update(id, body){
    //     let resultRows;
    //     for (const prop in body) {
    //         const sql = `
    //             UPDATE post
    //             SET ${prop} = $1
    //             WHERE id = $2
    //             RETURNING *`;
    //         const values = [body[prop], id];
    //         const result = await client.query(sql, values);
    //         resultRows = result.rows[0];
    //     }
    //     return resultRows;
    // },

    /**
     * Supprime un post
     * @param {*} id id du post
     * @returns détail du post delete
     */
    async delete(id){
        const sql = `
            DELETE
            FROM post
            WHERE id = $1`;
        const values = [id];
        const result = await client.query(sql, values);
        return result.rowCount;
    }
};

export {postDatamapper};