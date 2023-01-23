import express from "express";
const postRouter = express.Router();
import { postController } from "../controllers/index.js";
import { validation } from "../service/validation.js";
import { postBodySchema } from "../schema/postBody.js";

/**
 * Détail d'un post
 * @typedef {object} post
 * @property {integer} id - id unique du post
 * @property {integer} category_id - numéro de catégorie
 * @property {string} slug - string utilisable dans l'url
 * @property {string} title - titre du post
 * @property {string} excerpt - résumé du post
 * @property {string} content - contenu du post
 */

/**
 * Détail du body pour la création ou la modification d'un post
 * @typedef {object} postBody
 * @property {integer} category_id - numéro de catégorie
 * @property {string} slug - string utilisable dans l'url
 * @property {string} title - titre du post
 * @property {string} excerpt - résumé du post
 * @property {string} content - contenu du post
 */

//* ----------------- route /post -----------------
/**
 * GET /posts
 * @summary Renvoi l'ensemble des posts
 * @tags posts
 * @return {post[]} 200 - liste des posts
 * @return {object} 500 - Unexpected error
 */
postRouter.get('/posts', postController.getAll);
/**
 * POST /posts
 * @summary Crée un post
 * @tags posts
 * @param {postBody} request.body.required - details du post qui va être créé
 * @return {post} 200 - détails du post créé
 * @return {object} 500 - Unexpected error
 */
postRouter.post('/posts', validation.checkBody(postBodySchema), postController.create);


//* ----------------- route /post/:id -----------------
/**
 * GET /posts/:id
 * @summary Renvoi un post
 * @tags posts
 * @param {integer} request.params.id.required - id du post
 * @return {post} 200 - détail d'un post
 * @return {object} 500 - Unexpected error
 */
postRouter.get('/posts/:id([0-9]+)', postController.getOne);
/**
 * PATCH /posts/:id
 * @summary update un post
 * @tags posts
 * @param {postBody} request.body.required - details du post qui va être update
 * @param {integer} request.params.id.required - id du post
 * @return {post} 200 - détails du post modifié
 * @return {object} 500 - Unexpected error
 */
postRouter.patch('/posts/:id([0-9]+)', validation.checkBody(postBodySchema), postController.update);
/**
 * DELETE /posts/:id
 * @summary Delete un post
 * @tags posts
 * @param {integer} request.params.id.required - id du post qui doit être delete
 * @return {string} 200 - nombre de lignes supprimées
 * @return {object} 500 - Unexpected error
 */
postRouter.delete('/posts/:id([0-9]+)', postController.delete);


//* ----------------- route /post/category/:id -----------------
/**
 * GET /posts/category/:id
 * @summary Renvoi tous les posts d'une catégorie
 * @tags posts
 * @param {integer} request.params.id.required - id de la catégorie
 * @return {post[]} 200 - liste des posts de la catégorie
 * @return {object} 500 - Unexpected error
 */
postRouter.get('/posts/category/:id([0-9]+)', postController.getAllByCategorieId);

export {postRouter};