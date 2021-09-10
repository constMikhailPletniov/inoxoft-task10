const { ADMIN_REGISTRATION, GOODBYE,
    REGISTRATION,
    WELCOME, FORGOT_PASS } = require('../config/emailAction.enum');

module.exports = {
    [ADMIN_REGISTRATION]: {
        templateName: 'adminregistration',
        subject: 'Admin Registration'
    },
    [FORGOT_PASS]: {
        templateName: 'forgotPassword',
        subject: 'Dont worry we can help You create, new password'
    },
    [GOODBYE]: {
        templateName: 'goodbye',
        subject: 'Have a nice day. We will cry'
    },
    [REGISTRATION]: {
        templateName: 'registration',
        subject: 'Thank for Your cooperation'
    },
    [WELCOME]: {
        templateName: 'welcome',
        subject: 'Welocme on board'
    }
};
