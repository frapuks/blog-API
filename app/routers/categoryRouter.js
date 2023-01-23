import express from "express";
const categoryRouter = express.Router();
import { categoryController } from "../controllers/index.js";
import { validation } from "../service/validation.js";
import { categoryBodySchema } from "../schema/categoryBody.js";


/**
 * Détails d'une catégorie
 * @typedef {object} category
 * @property {integer} id - id unique de la catégorie
 * @property {string} route - route de la catégorie
 * @property {string} label - nom de la catégorie
*/

/**
 * Détails du body pour la création ou la modification d'une catégorie
 * @typedef {object} categoryBody
 * @property {string} route - route de la catégorie
 * @property {string} label - nom de la catégorie
 */

//* ----------------- route /category -----------------
/**
 * GET /categories
 * @summary Renvoi l'ensemble des categories
 * @tags categories
 * @return {category[]} 200 - liste des categories
 * @return {object} 500 - Unexpected error
 */
categoryRouter.get('/categories', categoryController.getAll);
/**
 * POST /categories
 * @summary Crée une category
 * @tags categories
 * @param {categoryBody} request.body.required - details d'une categorie qui va être créée
 * @return {category} 200 - détails de la catégorie créé
 * @return {object} 500 - Unexpected error
 */
categoryRouter.post('/categories', validation.checkBody(categoryBodySchema), categoryController.create);


//* ----------------- route /category/:id -----------------
/**
 * GET /categories/:id
 * @summary Renvoi une categories
 * @tags categories
 * @param {integer} request.params.id.required - id de la catégorie
 * @return {category} 200 - détail de la categorie
 * @return {object} 500 - Unexpected error
 */
categoryRouter.get('/categories/:id([0-9]+)', categoryController.getOne);
/**
 * PATCH /categories/:id
 * @summary update une categories
 * @tags categories
 * @param {categoryBody} request.body.required - détail de la catégorie qui va être update
 * @param {integer} request.params.id.required - id de la catégorie
 * @return {category} 200 - détail de la categorie
 * @return {object} 500 - Unexpected error
 */
categoryRouter.patch('/categories/:id([0-9]+)', validation.checkBody(categoryBodySchema), categoryController.update);
/**
 * DELETE /categories/:id
 * @summary delete une categories
 * @tags categories
 * @param {integer} request.params.id.required - id de la catégorie
 * @return {string} 200 - nombre de categorie supprimée
 * @return {object} 500 - Unexpected error
 */
categoryRouter.delete('/categories/:id([0-9]+)', categoryController.delete);


export {categoryRouter};