
const { Schema, model } = require('mongoose');
const { userRoleEnum } = require('../config');
const { pasService } = require('../services');

const superAdminSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        default: userRoleEnum.SUPER_ADMIN,
        enum: Object.values(userRoleEnum),
        type: String
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

superAdminSchema.virtual('fullName').get(function () {
    return `${this.name} ${this.email}`;
});

superAdminSchema.methods = {
    validatePassword(password) {
        return pasService.compare(password, this.password);
    }
};

superAdminSchema.statics = {
    async createWithHashPassword(userObject) {
        const hashPassword = await pasService.hash(userObject.password);

        return this.create({
            ...userObject,
            password: hashPassword
        });
    }
};

module.exports = model('superAdmin', superAdminSchema);
