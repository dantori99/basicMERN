const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: 'string',
            required: true,
            tolowercase: true,
        },
        email: {
            type: 'string',
            required: true,
            tolowercase: true,
        },
        password: {
            type: 'string',
            required: true
        },
        token: {
            type: 'string',
            max: 1000
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
    }
);

userSchema.plugin(mongooseDelete, { overrideMethods: "all" });

const User = mongoose.model('User', userSchema);

module.exports = User;