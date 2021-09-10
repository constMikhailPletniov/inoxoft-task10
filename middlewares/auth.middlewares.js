
const { constants, dataEnum, statusEnum } = require('../config');
const { OAuth, Pest, Action } = require('../database');
const { ErrorHandler } = require('../errors/errors.handler');
const jwtService = require('../services/jwt.service');
const { userValidator } = require('../validator');

module.exports = {
    checkActionToken: (actionType) => async (req, res, next) => {
        try {
            const actionToken = req.get(constants.AUTHORIZATION);

            if (!actionToken) {
                throw new ErrorHandler(
                    statusEnum.UNAUTHORIZED,
                    'No action Token'
                );
            }

            jwtService.verifyActionToken(actionToken, actionType);

            const dbToken = await Action.findOne({ actionToken });

            if (!dbToken) {
                throw new ErrorHandler(
                    statusEnum.UNAUTHORIZED,
                    'In valid token'
                );
            }
            next();
        } catch (err) {
            next(err);
        }
    },
    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(
                    statusEnum.UNAUTHORIZED,
                    'No token'
                );
            }

            jwtService.verifyTokens(token);

            const dbToken = await OAuth.findOne({ accessToken: token }).
                populate(dataEnum.USER);

            if (!dbToken) {
                throw new ErrorHandler(
                    statusEnum.UNAUTHORIZED,
                    'Invalid Token'
                );
            }
            req.currentUser = dbToken.user;
            next();
        } catch (err) {
            next(err);
        }
    },
    checkId: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);
            const { user_id } = req.params;
            const current = await OAuth.findOne({ accessToken: token }).
                populate(dataEnum.USER);
            const id = current.user._id.toString();
            const param = user_id.toString();
            if (id !== param) {
                throw new ErrorHandler(statusEnum.FORBIDDEN, 'Forbidden');
            }
            res.status(statusEnum.OK);
            next();
        } catch (err) {
            next(err);
        }
    },
    checkPestId: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);
            const { pest_id } = req.params;
            const currentPest = await Pest.findById(pest_id);
            const current = await OAuth.findOne({ accessToken: token }).
                populate(dataEnum.USER);
            const id = current.user._id.toString();
            const param = currentPest.user.toString();
            if (id !== param) {
                throw new ErrorHandler(statusEnum.FORBIDDEN, 'Forbidden');
            }
            res.status(statusEnum.OK);
            next();
        } catch (err) {
            next(err);
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {

            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(
                    statusEnum.UNAUTHORIZED,
                    'No token'
                );
            }

            jwtService.verifyTokens(token, 'refresh');

            const tokenFromDB = await OAuth.findOne({ refreshToken: token }).
                populate(dataEnum.USER);

            if (!tokenFromDB) {
                throw new ErrorHandler(
                    statusEnum.UNAUTHORIZED,
                    'Invalid token'
                );
            }

            req.currentUser = tokenFromDB.user;

        } catch (err) {
            next(err);
        }
    },
    validatePassword: (req, res, next) => {
        try {
            const { error, value } = userValidator.
                passValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(
                    statusEnum.BAD_REQUEST,
                    error.details[statusEnum.ZERO].message
                );
            }

            req.body = value;
            next();
        } catch (err) {
            next(err);
        }
    }
}
