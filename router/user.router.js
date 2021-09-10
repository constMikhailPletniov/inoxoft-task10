
const exp = require('express');
const router = new exp.Router();

const { userControl } = require('../controls');
const { authMiddleWare, fileMiddleWare, userMiddleWare } = require('../middlewares/');

const { userRoleEnum } = require('../config');

router.use(
    '/:user_id',
    userMiddleWare.getByDynamicParam('user_id', 'params', '_id'),
    userMiddleWare.isUserByIdExist
);

router.get(
    '/:user_id', authMiddleWare.checkAccessToken, authMiddleWare.checkId,
    userMiddleWare.isCheckRole(userRoleEnum.USER), userControl.getUserById
);
router.delete(
    '/:user_id', authMiddleWare.checkAccessToken, authMiddleWare.checkId,
    userMiddleWare.isCheckRole(userRoleEnum.USER), userControl.deleteUserById
);
router.patch(
    '/:user_id', authMiddleWare.checkAccessToken,
    authMiddleWare.checkId,
    userMiddleWare.isUserValidUpdateData,
    userMiddleWare.isCheckRole(userRoleEnum.USER),
    userControl.updateUser
);

router.get('/', userControl.getAllUsers);
router.post(
    '/',
    userMiddleWare.isUserValidCreateData,
    fileMiddleWare.checkAvatar,
    userMiddleWare.getByDynamicParam('email', 'body'),
    userMiddleWare.isValidEmail,
    userControl.createUser
);


module.exports = router;

