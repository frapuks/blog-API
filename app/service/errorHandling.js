import Debug from "debug";
const debug = Debug("errorHandling");
import { appendFile } from "fs/promises";
import path from "path";

const errorHandling = {
    /**
     * Prend en charge les erreurs, et appelle la fonction writeLog
     * @param {*} err erreur à traiter
     * @param {*} req requête
     * @param {*} res réponse
     * @param {*} next  next
     */
    manage(err, req, res, next){
        errorHandling.writeLog(req.url, err);
        return res.status(err.code).json(err.message);
    },

    /**
     * Ecrit les fichiers de log d'erreurs
     * @param {*} url url de l'erreur
     * @param {*} err erreur à loguer
     */
    writeLog(url, err){
        debug(err.message);
        const date = new Date();
        const fileDate = date.toISOString().split('T')[0];
        const errTime = date.toTimeString().split(' ')[0];
        
        const filename = `${fileDate}.log`;
        const content = `${errTime} ; ${url} ; ${err.message}\n`;
        // appendFile(`./logs/${filename}`, content);

        const __dirname = path.resolve('./app/service');
        const dirPath = path.resolve(__dirname, '../../logs/', filename);
        appendFile(dirPath, content);
    }
}

export {errorHandling};