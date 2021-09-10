const { Schema, model } = require('mongoose');

const { dataEnum } = require('../config');

const ActionSchema = new Schema({
    actionToken: {
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

ActionSchema.pre('findOne', function () {
    this.populate(dataEnum.USER);
});


module.exports = model(dataEnum.ACTION_TOKEN, ActionSchema);
