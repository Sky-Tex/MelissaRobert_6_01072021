// Jeton ou token Les tokens JWT sont encodés et peuvent donc être décodés avec la clé secrète.

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        const decodedToken = jwt.verify(token, 'NEW_RANDOM_TOKEN');
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId){
            throw 'ID utlisateur non valide';
        }else{
            next();
        }
    } catch (error){
        res.status(401).json({
            error: new Error('Requete Invalide')
        });
    }
};