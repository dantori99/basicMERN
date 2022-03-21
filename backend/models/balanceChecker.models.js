const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const balanceCheckerSchema = new mongoose.Schema(
    {
        totalBalance: {
            type: Number,
            default: 0,
        },
        income: {
            type: Number,
            default: 0,
        },
        expense: {
            type: Number,
            default: 0,
        },
        description: {
            type: 'string',
        },
        user_id: [{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        }]
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        },
        toJSON: { getters: true },
        versionKey: false,
    },
);

balanceCheckerSchema.plugin(mongooseDelete, { overrideMethods: 'all' });

const balanceChecker = mongoose.model('BalanceChecker', balanceCheckerSchema);

module.exports = balanceChecker;
