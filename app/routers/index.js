import express from "express";
const router = express.Router();



// MAIN
import { mainRouter } from "./mainRouter.js";
router.use(mainRouter);

// POST
import { postRouter } from "./postRouter.js";
router.use(postRouter);

// CATEGORY
import { categoryRouter } from "./categoryRouter.js";
router.use(categoryRouter);



export {router};