const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/authConfig');

const router = express.Router();

function generateToken(userId = {}) {
    return jwt.sign(userId, authConfig.secret, { expiresIn: 86400 });
}

router.post('/register', async (req, res) => {
    const { email } = req.body;
    try {
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: "Usuário já existe" });
        }
        const user = await User.create(req.body);

        return res.send({
            user,
            token: generateToken({ id: user.id })
        });
    } catch (error) {
        console.log('ERRO', error);
        return res.status(400).send({ error });
    }
});

router.post('/authenticate', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).send({ error: 'Usuário não existe' });
        }
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ error: 'Senha inválida' });
        }
        user.password = undefined;

        return res.send({
            user,
            token: generateToken({ id: user.id })
        });

    } catch (error) {
        return res.status(400).send({ error });
    }
})



module.exports = app => app.use('/auth', router);
