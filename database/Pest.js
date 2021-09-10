/* eslint-disable sort-keys */
const { Schema, model } = require('mongoose');

const { dataEnum } = require('../config');

const pestSchema = new Schema({
    price: {
        type: Number,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    number: {
        type: Number,
        trim: true,
        required: true
    },
    purchase: {
        type: Number,
        required: true,
        trim: true,
        select: false
    },
    clasification: {
        type: String,
        required: true,
        trim: true
    },
    [dataEnum.USER]: {
        ref: dataEnum.USER,
        type: Schema.Types.ObjectId
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

module.exports = model('pest', pestSchema);
