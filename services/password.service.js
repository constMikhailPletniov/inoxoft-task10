const bcrypt = require('bcrypt');

const { ErrorHandler } = require('../errors/errors.handler');
const { BAD_REQUEST, SALT } = require('../config/conf');

module.exports = {
    hash: (password) => bcrypt.hash(password, SALT),

    compare: async (password, hashpassword) => {

        const isPassMatched = await bcrypt.compare(password, hashpassword);

        if (!isPassMatched) {
            throw new ErrorHandler(
                BAD_REQUEST,
                'Your password or Your email are incorect'
            );
        }

    }
}
