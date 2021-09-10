const exp = require('express')
const router = new exp.Router();

const { authMiddleWare, pestMiddleWare } = require('../middlewares');
const { pestControl } = require('../controls');

router.use(
    '/:pest_id', pestMiddleWare.
        getByDynamicParam('pest_id', 'params', '_id'),
    pestMiddleWare.isPestExistId
);

router.get('/', pestControl.getAllPests);
router.post(
    '/', authMiddleWare.checkAccessToken, pestMiddleWare.isValidPestData,
    pestMiddleWare.isValidName, pestControl.createPest
);

router.get(
    '/:pest_id', authMiddleWare.checkAccessToken, authMiddleWare.checkPestId,
    pestControl.getPestsById
);
router.delete(
    '/:pest_id', authMiddleWare.checkAccessToken, authMiddleWare.checkPestId,
    pestControl.deletePestById
);
router.patch(
    '/:pest_id', authMiddleWare.checkAccessToken, authMiddleWare.checkPestId,
    pestMiddleWare.isValidUpdatePestData,
    pestControl.updatePest
);

module.exports = router;
