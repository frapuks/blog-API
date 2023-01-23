import "dotenv/config";
import express from "express";
const app = express();
import cors from "cors";
import { router } from "./app/routers/index.js";
import { errorHandling } from "./app/service/errorHandling.js";
import expressJSDocSwagger from "express-jsdoc-swagger";

const swaggerOptions = {
    info: {
        version: '1.0.0',
        title: 'oblog',
        license: {
            name: 'MIT',
        },
    },
    swaggerUIPath: '/oblog-api',
    security: {
        BasicAuth: {
            type: 'http',
            scheme: 'basic',
        },
    },
    baseDir: './',
    filesPattern: './**/*.js',
};

expressJSDocSwagger(app)(swaggerOptions);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(router);

app.use((req, res, next) => {
    const error = new Error('PAGE NOT FOUND !');
    error.code = 404;
    next(error);
});

app.use(errorHandling.manage);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT,()=>{
    console.log(`Mon serveur est démarré sur http://localhost:${PORT}`);
});