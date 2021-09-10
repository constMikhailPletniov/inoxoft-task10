
module.exports = {
    CURRENT_YEAR: new Date().getFullYear(),

    EMAIL_REGEXP:
        new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),

    PASSWORD_REGEXP:
        new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/)
};
