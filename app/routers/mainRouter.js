import express from "express";
const mainRouter = express.Router();
import { mainController } from "../controllers/index.js";

/**
 * GET /
 * @summary Page d'accueil pour dire bonjour
 * @tags oblog
 * @return {string} 200 - message d'accueil
 * @return {object} 500 - Unexpected error
 */
mainRouter.get('/', mainController.homepage);

export {mainRouter};