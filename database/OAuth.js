const { Schema, model } = require('mongoose');

const { dataEnum } = require('../config');

const OAuthSchema = new Schema({
    accessToken: {
        required: true,
        type: String
    },
    refreshToken: {
        required: true,
        type: String
    },
    [dataEnum.USER]: {
        ref: dataEnum.USER,
        required: true,
        type: Schema.Types.ObjectId
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

OAuthSchema.pre('findOne', function () {
    this.populate(dataEnum.USER);
});

module.exports = model(dataEnum.OAUTH, OAuthSchema);
