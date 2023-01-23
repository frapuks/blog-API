const validation = {
    /**
     * Doit vérifier si le req.body correspond au schéma demandé
     * @param {*} schema 
     * @returns next([error])
     */
    checkBody(schema){
        return (req, res, next) => {
            const {error} = schema.validate(req.body);
            error ? ( error.code = 500, next(error) ) : next();
        }
    }
}

export {validation};