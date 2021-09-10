const { ErrorHandler } = require("../errors/errors.handler");
const { statusEnum, constants } = require('../config');

module.exports = {
    checkAvatar: (req, res, next) => {
        try {
            const { avatar } = req.files;
            if (!avatar) {
                next();
                return;
            }
            const { name, size, mimetype } = avatar;

            if (!constants.PHOTO_MIMETYPES.includes(mimetype)) {
                throw new ErrorHandler(statusEnum.BAD_REQUEST,
                    `File ${name} is invalid type of image`);
            }

            if (size > constants.MAX_SIZE_AVATAR) {
                throw new ErrorHandler(statusEnum.BAD_REQUEST,
                    `File ${name} is too big`);
            }

            next();
        } catch (err) {
            next(err);
        }
    }
}