const mongoose = require('../../database/index');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    variableInvestment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Investment'
    }],
    fixedInvestment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Investment'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function (next) {
    if (!this.password) next();
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;