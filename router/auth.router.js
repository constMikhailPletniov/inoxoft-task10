const { Router } = require('express');
const router = new Router();

const { authControl } = require('../controls');
const { authMiddleWare, userMiddleWare } = require('../middlewares');
const { actionTokenTypes } = require('../config');

router.post(
    '/', userMiddleWare.getByDynamicParam('email'),
    userMiddleWare.isUserByIdExist,
    authControl.login
);
router.post('/logout', authMiddleWare.checkAccessToken, authControl.logout);
router.post(
    '/refresh', authMiddleWare.checkRefreshToken,
    authControl.refreshToken
);
router.post(
    '/forgot/send', userMiddleWare.getByDynamicParam('email'),
    authControl.forgotPass
);
router.post(
    '/forgot/set', authMiddleWare.validatePassword,
    authMiddleWare.checkActionToken(actionTokenTypes.FORGOT_PASSWORD),
    authControl.setNewPassword
);

router.post(
    '/regAdmin/send',
    authControl.adminRegistration
);

router.post(
    '/regAdmin/set', authMiddleWare.validatePassword,
    authMiddleWare.checkActionToken(actionTokenTypes.FIRST_LOGIN),
    authControl.setAdminPass
);
module.exports = router;
