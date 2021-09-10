const { statusEnum, userRoleEnum } = require('../config');
const { SuperAdmin } = require('../database');

module.exports = {
    checkSuperAdmin: async (req, res, next) => {
        try {
            const superAdmin = await SuperAdmin.findOne({ role: userRoleEnum.SUPER_ADMIN });

            if (!superAdmin) {
                next();
                return;
            }
            res.status(statusEnum.CREATE).json('The super Admin was create');
        } catch (err) {
            next(err);
        }
    }
}
