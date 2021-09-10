
module.exports = {
    AUTHORIZATION: 'Authorization',
    CURRENT_YEAR: new Date().getFullYear(),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    MAX_SIZE_AVATAR: 5 * 1024 * 1024,
    PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/),
    PHOTO_MIMETYPES: ['image/gif',
        'image/jpeg']

};
