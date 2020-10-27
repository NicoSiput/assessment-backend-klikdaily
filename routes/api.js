const router = require('express').Router();
const apiController = require('../controllers/apiController');

router.get('/stocks', apiController.getStocks);
router.post('/adjustment', apiController.adjustment);
router.get('/logs/:location_id', apiController.logs);

module.exports = router;
