import {client} from "../service/database.js";

const categoryDatamapper = {
    /**
     * récupère toutes les catégories
     * @returns liste des catégories
     */
    async getAll(){
        const sql = `SELECT * FROM category`;
        const result = await client.query(sql);
        return result.rows;
    },

    /**
     * récupère une catégorie
     * @param {*} id id de la catégorie
     * @returns détail de la catégorie
     */
    async getOne(id){
        const sql = `
            SELECT *
            FROM category
            WHERE id = $1`;
        const values = [id]
        const result = await client.query(sql, values);
        return result.rows[0];
    },

    /**
     * crée une catégorie
     * @param {*} body détails de la catégorie à créer
     * @returns détail de la catégorie créé
     */
    async create(body){
        const sql = `
            INSERT INTO category (route, label)
            VALUES ($1, $2)
            RETURNING *`;
        const values = [body.route, body.label];
        const result = await client.query(sql, values);
        return result.rows[0];
    },

    /**
     * Met à jour une catégorie
     * @param {*} id id de la catégorie
     * @param {*} body détails de la catégorie à update
     * @returns détail de la catégorie update
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
            UPDATE category
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
    //             UPDATE category
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
     * Supprime une catégorie
     * @param {*} id id de la catégorie
     * @returns détail de la catégorie delete
     */
    async delete(id){
        const sql = `
            DELETE
            FROM category
            WHERE id = $1`;
        const values = [id];
        const result = await client.query(sql, values);
        return result.rowCount;
    }
};

export {categoryDatamapper};