
const { Pest } = require('../database');
const { statusEnum } = require('../config');
const { ErrorHandler } = require('../errors/errors.handler');
const { pestValidator } = require('../validator');

const getByDynamicParam = (
    paramsName,
    searchIn = 'body', paramDb = paramsName
) => async (req, res, next) => {
    try {
        const value = req[searchIn][paramsName];
        const pest = await Pest.findOne({ [paramDb]: value });
        // eslint-disable-next-line require-atomic-updates
        req.pest = pest;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getByDynamicParam,
    isPestExistId: (req, res, next) => {
        try {

            const { pest } = req;
            if (!pest) {
                throw new ErrorHandler(
                    statusEnum.NOT_FOUND,
                    'Pest by id not found!'
                );
            }

            next();

        } catch (err) {
            next(err);
        }
    },
    isValidName: (req, res, next) => {
        try {

            const { pest } = req;

            if (pest) {
                throw new ErrorHandler(
                    statusEnum.CONFLICT,
                    'Pest is already exist'
                );
            }
            next();

        } catch (err) {
            next(err);
        }
    },
    isValidPestData: async (req, res, next) => {
        try {
            const { err } = await pestValidator.
                pestsCreateValidator.validateAsync(req.body);

            if (err) {
                throw new ErrorHandler(statusEnum.BAD_REQUEST, err.
                    details[statusEnum.ZERO].
                    message);
            }
            next();
        } catch (err) {
            next(err);
        }
    },
    isValidUpdatePestData: async (req, res, next) => {
        try {
            const { err } = await pestValidator.
                pestsUpdateValidator.validateAsync(req.body);

            if (err) {
                throw new ErrorHandler(statusEnum.BAD_REQUEST, err.
                    details[statusEnum.ZERO].
                    message);
            }
            next();
        } catch (err) {
            next(err);
        }
    }
}
