const jwt = require('jsonwebtoken');
const authConfig = require('../../config/authConfig')

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({ error: 'Nenhum Token foi fornecido' })
        }
        const splited = authHeader.split(' ');
        if (splited.length !== 2) {
            return res.status(401).send({ error: 'Ocorreu algum erro com o Token de autenticação' });
        }
        const [bearer, token] = splited;
        if (!/^Bearer$/i.test(bearer)) {
            return res.status(401).send({ error: 'Token mal formatado' });
        }
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) return res.status(401).send({ error: 'Token inválido' });
            req.userId = decoded.id;
            return next();
        });
    } catch (error) {
        res.status(400).send({ error });
    }



}