const exp = require('express');
const router = new exp.Router();
const { adminControl } = require('../controls');
const { adminMiddleware } = require('../middlewares');

router.post('/', adminMiddleware.checkSuperAdmin, adminControl.createSuperAdmin);

module.exports = router;
