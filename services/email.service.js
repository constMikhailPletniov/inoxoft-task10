
const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');
const process = require('process');

const templatesInfo = require('../email-templates');

const { statusEnum } = require('../config');
const { ErrorHandler } = require('../errors/errors.handler');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: statusEnum.EMAIL,
        pass: statusEnum.EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateToSend = templatesInfo[emailAction];
    context = {
        ...context,
        frontendURL: statusEnum.FRONTED_URL
    };

    if (!templateToSend) {
        throw new ErrorHandler(
            statusEnum.InternalServerError,
            'Wrong template name'
        );
    }

    const { templateName, subject } = templateToSend;

    const html = await templateParser.render(templateName, context);

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject,
        html
    });
};

module.exports = {
    sendMail
};
