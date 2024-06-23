const express = require('express')
const router = express.Router();

const warehouseListController = require('../controllers/warehouseListController')
router.post('/api/v1/createWarehouse',warehouseListController.createWarehouse);
router.get('/api/v1/getWarehouseList',warehouseListController.getWarehouseList);
router.get('/api/v1/getWarehouseById/:id',warehouseListController.getWarehouseById);
router.put('/api/v1/editWarehouse',warehouseListController.editWarehouse);
router.get('/api/v1/getWarehouseByPlant/:plantId',warehouseListController.getWarehouseByPlant);

module.exports = router;