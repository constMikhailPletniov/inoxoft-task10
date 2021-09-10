const Joi = require('joi');

module.exports = {
    pestsCreateValidator: Joi.object({
        clasification: Joi.string().trim().
            alphanum().
            required(),
        name: Joi.string().trim().
            alphanum().
            required(),
        number: Joi.number().
            required(),
        price: Joi.number().
            required(),
        purchase: Joi.number().positive().
            required()
    }),
    pestsUpdateValidator: Joi.object({
        number: Joi.number().positive().
            required(),
        price: Joi.number().positive().
            required(),
        purchase: Joi.number().positive().
            required()
    })
}
