const { Router } = require('express');
const stockCtrl = require('../controllers/stock.controller');
const router = Router();

router.get('/stock/getStock', stockCtrl.getStock);
router.get('/stock/getStock/:nameStock', stockCtrl.getStockByName);
router.get('/stock/getStock/filter/:nameStock/:sizeStock', stockCtrl.getStockByNameAndSize);
router.post('/stock/createStock', stockCtrl.createStock);
router.put('/stock/update/:filter/:update', stockCtrl.updateStockQuantityById);
router.put('/stock/updateStock', stockCtrl.updateStockById);
router.put('/stock/update/:filterName/:filterSize/:update', stockCtrl.updateStockQuantityByNameAndSize);


module.exports = router;
