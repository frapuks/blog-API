import {categoryDatamapper} from "../datamappers/index.js";

const categoryController = {
    /**
     * Doit retourner la liste de toutes les categories
     * @param {*} req requête
     * @param {*} res réponse
     * @param {*} next next
     * @returns {string} liste des categories
     */
    async getAll(req, res, next){
        try {
            const categories = await categoryDatamapper.getAll();
            if (categories.length) {
                return res.json(categories);
            } else {
                throw new Error(`Aucun élément trouvé`);
            }
        } catch (error) {
            error.code = 500;
            next(error);
        }
    },

    /**
     * Doit retourner une categorie par rapport à son id
     * @param {*} req requête
     * @param {*} res réponse
     * @param {*} next next
     * @returns {string} détails d'une catégorie
     */
    async getOne(req, res, next){
        const id = parseInt(req.params.id);
        try {
            const category = await categoryDatamapper.getOne(id);
            if (category) {
                return res.json(category);
            } else {
                throw new Error(`Aucun élément trouvé correspondant à : id = ${id}`);
            }
        } catch (error) {
            error.code = 500;
            next(error);
        }
    },

    /**
     * Doit insérer une catégorie dans la BDD
     * @param {*} req requête
     * @param {*} res réponse
     * @param {*} next next
     * @returns {string} détails de la catégorie créée
     */
    async create(req, res, next){
        const body = req.body;
        try {
            const category = await categoryDatamapper.create(body);
            return res.json(category);
        } catch (error) {
            error.code = 500;
            next(error);
        }
    },

    /**
     * Doit update une catégorie
     * @param {*} req requête
     * @param {*} res réponse
     * @param {*} next next
     * @returns {string} détail de la catégorie
     */
    async update(req, res, next){
        const id = parseInt(req.params.id);
        const body = req.body;
        try {
            const category = await categoryDatamapper.update(id, body);
            if (category) {
                return res.json(category);
            } else {
                throw new Error(`0 éléments mis à jour : aucune donnée transmise ou aucune catégorie trouvée`);
            }
        } catch (error) {
            error.code = 500;
            next(error);
        }
    },

    /**
     * Doit delete une catégorie
     * @param {*} req requête
     * @param {*} res réponse
     * @param {*} next next
     * @returns {string} nombre de catégories delete
     */
    async delete(req, res, next){
        const id = parseInt(req.params.id);
        try {
            const rowCount = await categoryDatamapper.delete(id);
            if (category) {
                return res.json(`Nombre de lignes supprimées : ${rowCount}`);
            } else {
                throw new Error(`Aucun élément trouvé correspondant à : id = ${id}`);
            }
        } catch (error) {
            error.code = 500;
            next(error);
        }
    }
}

export {categoryController};