import {postDatamapper} from "../datamappers/index.js";

const postController = {
    /**
     * Doit retourner la liste de tout les posts
     * @param {*} req requête
     * @param {*} res réponse
     * @param {*} next next
     * @returns {string} liste des posts
     */
    async getAll(req, res, next){
        try {
            const posts = await postDatamapper.getAll();
            if (posts.length) {
                return res.json(posts);
            } else {
                throw new Error(`Aucun élément trouvé`);
            }
        } catch (error) {
            error.code = 500;
            next(error);
        }
    },

    /**
     * Doit retourner un post par rapport à son id
     * @param {*} req requête
     * @param {*} res réponse
     * @param {*} next next
     * @returns {string} détails du posts
     */
    async getOne(req, res, next){
        const id = parseInt(req.params.id);
        try {
            const post = await postDatamapper.getOne(id);
            if (post) {
                return res.json(post);
            } else {
                throw new Error(`Aucun élément trouvé correspondant à : id = ${id}`);
            }
        } catch (error) {
            error.code = 500;
            next(error);
        }
    },

    /**
     * Doit insérer un post dans la BDD
     * @param {*} req requête
     * @param {*} res réponse
     * @param {*} next next
     * @returns {string} détails du posts créé
     */
    async create(req, res, next){
        const body = req.body;
        try {
            const post = await postDatamapper.create(body);
            return res.json(post);
        } catch (error) {
            error.code = 500;
            next(error);
        }
    },

    /**
     * Doit récupérer tous les posts d'ne catégorie
     * @param {*} req requête
     * @param {*} res réponse
     * @param {*} next next
     * @returns {string} liste des posts
     */
    async getAllByCategorieId(req, res, next){
        const id = parseInt(req.params.id);
        try {
            const posts = await postDatamapper.getAllByCategorieId(id);
            if (posts.length) {
                return res.json(posts);
            } else {
                throw new Error(`Aucun élément trouvé correspondant à : categoryId = ${id}`);
            }
        } catch (error) {
            error.code = 500;
            next(error);
        }
    },

    /**
     * Doit update un post
     * @param {*} req requête
     * @param {*} res réponse
     * @param {*} next next
     * @returns {string} nombres de colonnes mises à jour
     */
    async update(req, res, next){
        const id = parseInt(req.params.id);
        const body = req.body;
        try {
            const post = await postDatamapper.update(id, body);
            if (post) {
                return res.json(post);
            } else {
                throw new Error(`0 élément mis à jour : aucune donnée transmise ou aucun post trouvé`);
            }
        } catch (error) {
            error.code = 500;
            next(error);
        }
    },

    /**
     * Doit delete un post
     * @param {*} req requête
     * @param {*} res réponse
     * @param {*} next next
     * @returns {string} nombre de posts delete
     */
    async delete(req, res, next){
        const id = parseInt(req.params.id);
        try {
            const rowCount = await postDatamapper.delete(id);
            if (rowCount) {
                return res.json(`Nombre de ligne supprimées : ${rowCount}`);
            } else {
                throw new Error(`Aucun élément trouvé correspondant à : id = ${id}`);
            }
        } catch (error) {
            error.code = 500;
            next(error);
        }
    }
}

export {postController};