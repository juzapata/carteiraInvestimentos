const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const Investiments = require('../models/investment');
const User = require('../models/user');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate(['fixedInvestment', 'variableInvestment']);
        if (!user) res.status(400).send({ error: '' });
        return res.send({ sucesso: true, user: user });
    } catch (error) {
        console.log('ERRR', err);
        return res.status(400).send({ error });
    }
});

router.post('/', async (req, res) => {
    try {
        const investment = await Investiments.create({ ...req.body, assignedTo: req.userId });
        const user = await User.findById(req.userId);
        if (investment.type === 'RENDA_FIXA') user.fixedInvestment.push(investment._id);
        else if (investment.type === 'RENDA_VARIAVEL') user.variableInvestment.push(investment._id);
        else if (investment.type !== 'RENDA_VARIAVEL' && investment.type !== 'RENDA_FIXA') return res.status(400).send({ error: `Tipo de investimento não existe. Este deve ser do tipo RENDA_FIXA' ou do tipo 'RENDA_VARIAVEL'` });
        await user.save();
        const populatedUser = await User.findById(req.userId).populate(['fixedInvestment', 'variableInvestment']);
        return res.send({ createdInvest: investment, user: populatedUser });
    } catch (error) {
        console.log('ERRO', error);
        return res.status(400).send({ error });
    }
});

router.delete('/:investmentId', async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) res.status(400).send({ error: 'Usuário não existe' });
        const deleted = await Investiments.findByIdAndRemove(req.params.investmentId);
        if (!deleted) return res.status(400).send({ error: 'Id do investimento informado não existe' });
        if (deleted.type === 'RENDA_VARIAVEL') {
            user.variableInvestment.pull(deleted._id);
            await user.save();
        } else if (deleted.type === 'RENDA_FIXA') {
            user.fixedInvestment.pull(deleted._id);
            await user.save();
        }
        const populatedUser = await User.findById(req.userId).populate(['fixedInvestment', 'variableInvestment']);
        return res.send({ deleted, user: populatedUser });
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error });
    }
})

module.exports = app => app.use('/investments', router);
