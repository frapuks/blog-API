const mainController = {
    /**
     * renvoi un message d'accueil
     * @param {*} req Requête
     * @param {*} res Réponse
     * @returns "Hello World"
     */
    async homepage(req, res) {
        return res.json('Hello World');
    }
}

export {mainController};