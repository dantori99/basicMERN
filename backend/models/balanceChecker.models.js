const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const balanceCheckerSchema = new mongoose.Schema(
    {
        totalBalance: {
            type: Number,
        },
        income: {
            type: Number,
        },
        expense: {
            type: Number,
        },
        description: {
            type: 'string',
            required: true
        }
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        },
        toJSON: { getters: true },
        versionKey: false,
        id: false
    },
);

balanceCheckerSchema.plugin(mongooseDelete, { overrideMethods: 'all' });

const BalanceChecker = mongoose.model('BalanceChecker', balanceCheckerSchema);

module.exports = BalanceChecker;