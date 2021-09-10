

const Joi = require('joi');

const { regExp } = require('../config');
const { userRoleEnum } = require('../config');

module.exports = {
    passValidator: Joi.object({
        password: Joi.string().regex(regExp.PASSWORD_REGEXP).
            trim().
            required()
    }),
    userCreateValidator: Joi.object({
        email: Joi.string().regex(regExp.EMAIL_REGEXP).
            trim().
            required(),
        name: Joi.string().alphanum().
            min(2).
            max(15).
            trim().
            required(),
        password: Joi.string().regex(regExp.PASSWORD_REGEXP).
            trim().
            min(4).
            max(16).
            required(),
        repeatPassword: Joi.ref('password'),
        role: Joi.string().allow(...Object.values(userRoleEnum))
    }),
    userUpdateValidator: Joi.object({
        email: Joi.string().regex(regExp.EMAIL_REGEXP).
            trim(),
        name: Joi.string().alphanum().
            min(2).
            max(15).
            trim()
    })
}
