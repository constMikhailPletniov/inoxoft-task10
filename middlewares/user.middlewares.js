
const { User } = require('../database');
const { ErrorHandler } = require('../errors/errors.handler');
const { BAD_REQUEST,
    CONFLICT,
    FORBIDDEN,
    NOT_FOUND,
    ZERO } = require('../config');
const { userCreateValidator,
    userUpdateValidator } = require('../validator/users.validator');

const getByDynamicParam = (
    paramsName,
    searchIn = 'body', paramDb = paramsName
) => async (req, res, next) => {
    try {
        const value = req[searchIn][paramsName];
        const user = await User.findOne({ [paramDb]: value });
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getByDynamicParam,
    isCheckRole: (AccesRoles = []) => (req, res, next) => {
        try {
            const { role } = req.user;

            if (!AccesRoles.length) {
                next();
            }

            if (!AccesRoles.includes(role)) {
                throw new ErrorHandler(FORBIDDEN, 'Forbidden');
            }
            next();
        } catch (err) {
            next(err);
        }
    },
    isUserByIdExist: (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new ErrorHandler(NOT_FOUND, 'User by id not found!');
            }
            next();

        } catch (err) {

            next(err);

        }
    },
    isUserValidCreateData: async (req, res, next) => {
        try {
            const { err } = await userCreateValidator.validateAsync(req.body);

            if (err) {
                throw new ErrorHandler(BAD_REQUEST, err.details[ZERO].message);
            }
            next();
        } catch (err) {
            next(err);
        }
    },
    isUserValidUpdateData: async (req, res, next) => {
        try {
            const { err } = await userUpdateValidator.validateAsync(req.body);

            if (err) {
                throw new ErrorHandler(BAD_REQUEST, err.details[ZERO].message);
            }
            next();
        } catch (err) {
            next(err);
        }
    },
    isValidEmail: (req, res, next) => {
        try {
            const { user } = req;

            if (user) {
                throw new ErrorHandler(CONFLICT, 'Email is already exist');
            }
            next();
        } catch (err) {
            next(err);
        }
    }
}
