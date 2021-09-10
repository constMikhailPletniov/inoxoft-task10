
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../errors/errors.handler');
const { actionTokenTypes, statusEnum } = require('../config');

module.exports = {
    generateActionToken: (typeAction) => {
        let word = '';

        if (typeAction === actionTokenTypes.FIRST_LOGIN) {
            word = statusEnum.FIRST_LOGIN_TOKEN_SECRET;
        } else if (typeAction === actionTokenTypes.FORGOT_PASSWORD) {
            word = statusEnum.FORGOT_PASSWORD_TOKEN_SECRET;
        } else {
            throw new ErrorHandler(
                statusEnum.InternalServerError,
                'Wrong action type'
            );
        }

        const actionToken = jwt.sign(
            { typeAction }, word,
            { expiresIn: '7d' }
        );
        return actionToken;
    },
    generateTokens: () => {
        const accessToken = jwt.sign(
            {}, statusEnum.ACCESS_TOKEN_SECRET,
            { expiresIn: '30m' }
        );
        const refreshToken = jwt.sign(
            {}, statusEnum.REFRESH_TOKEN_SECRET,
            { expiresIn: '30d' }
        );
        return {
            accessToken,
            refreshToken
        };
    },
    verifyActionToken: (token, typeAction = 'forgotPassword') => {
        try {
            const secret = typeAction === 'forgotPassword'
                ? actionTokenTypes.FORGOT_PASSWORD
                : actionTokenTypes.FIRST_LOGIN;
            jwt.verify(token, secret);
        } catch (err) {
            throw new ErrorHandler(statusEnum.UNAUTHORIZED, 'Invalid token');
        }
    },
    verifyTokens: (token, tokenType = 'access') => {
        try {
            const secret = tokenType === 'access'
                ? statusEnum.ACCESS_TOKEN_SECRET
                : statusEnum.REFRESH_TOKEN_SECRET;
            jwt.verify(token, secret);
        } catch (err) {
            throw new ErrorHandler(statusEnum.UNAUTHORIZED, 'Invalid token');
        }

    }
}
