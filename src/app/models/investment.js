const mongoose = require('../../database/index');

const InvestSchema = new mongoose.Schema({
    type: {
        type: String,
        require: true
    },
    value: {
        type: String,
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Investment = mongoose.model('Investment', InvestSchema);

module.exports = Investment;