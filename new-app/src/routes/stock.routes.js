const { Router } = require('express');
const stockCtrl = require('../controllers/stock.controller');
const router = Router();

router.get('/stock/getStock', stockCtrl.getStock);
router.get('/stock/getStock/:nameStock', stockCtrl.getStockByName);
router.post('/stock/createStock', stockCtrl.createStock);
router.put('/stock/updateStock', stockCtrl.updateStockById);

module.exports = router;
