
const { actionTokenTypes, constants, statusEnum,
    emailAction, userRoleEnum } = require('../config');
const { Action, OAuth, User } = require('../database');
const { pasService, jwtService, emailService } = require('../services');
const { userNormalize } = require('../utils/user.util');

const adminRegistration = async (req, res, next) => {
    try {
        const { email } = req.body;

        const action = jwtService.generateActionToken(actionTokenTypes.
            FIRST_LOGIN);

        const admin = await User.create({
            ...req.body,
            password: statusEnum.STANDART_PASS
        });

        await Action.create({
            actionToken: action,
            user: admin._id
        });
        await emailService.sendMail(
            email,
            emailAction.ADMIN_REGISTRATION,
            {
                RegadmindUrl:
                    `${statusEnum.FRONTED_URL}/registration?token=${action}`
            }
        );

        res.status(statusEnum.OK).json('The email was send');
    } catch (err) {
        next(err);
    }
};

const forgotPass = async (req, res, next) => {
    try {
        const { user } = req;

        const action = jwtService.generateActionToken(actionTokenTypes.
            FORGOT_PASSWORD);

        await Action.create({
            actionToken: action,
            user: user._id
        });

        await emailService.sendMail(
            user.email,
            emailAction.FORGOT_PASS,
            {
                forgotPasswordUrl:
                    `${statusEnum.FRONTED_URL}/forgot?token=${action}`
            }
        );

        res.status(statusEnum.OK).json('The email was send');

    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { user, body: { password } } = req;

        await pasService.compare(password, user.password);

        const tokens = jwtService.generateTokens();

        await OAuth.create({
            ...tokens,
            user: user._id
        });

        res.json({
            ...tokens,
            user: userNormalize(user)
        });
    } catch (err) {
        next(err);
    }
};

const logout = async (req, res, next) => {
    try {
        const token = req.get(constants.AUTHORIZATION);

        await OAuth.deleteOne({
            accessToken: token
        });

        res.status(statusEnum.NO_CONTENT);
    } catch (err) {
        next(err);
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const token = req.get(constants.AUTHORIZATION);

        const tokens = jwtService.generateTokens();

        await OAuth.findOneAndUpdate({ refreshToken: token }, { ...tokens });

        res.status(statusEnum.NO_CONTENT);
    } catch (err) {
        next(err);
    }
};
const setNewPassword = async (req, res, next) => {
    try {
        const { body } = req;
        const actionToken = req.get(constants.AUTHORIZATION);

        const currentUser = await Action.findOne(actionToken.user)
        const passHash = await pasService.hash(body.password);

        await User.findByIdAndUpdate(currentUser.user._id,
            { password: passHash });
        await Action.deleteOne({ actionToken });
        await OAuth.deleteMany({ user: currentUser.user._id });

        res.status(statusEnum.OK).json('Update password');

    } catch (err) {
        next(err);
    }
};
const setAdminPass = async (req, res, next) => {
    try {
        const { password } = req.body;
        const actionToken = req.get(constants.AUTHORIZATION);

        const passHash = await pasService.hash(password);
        const currentAdmin = await Action.findOne(actionToken.user);

        await User.findByIdAndUpdate(currentAdmin.user._id,
            {
                password: passHash,
                role: userRoleEnum.ADMIN
            }
        );
        await Action.deleteOne({ actionToken });

        res.status(statusEnum.OK).json('Create Admin');

    } catch (err) {
        next(err);
    }
};

module.exports = {
    adminRegistration,
    forgotPass,
    login,
    logout,
    refreshToken,
    setAdminPass,
    setNewPassword
}
