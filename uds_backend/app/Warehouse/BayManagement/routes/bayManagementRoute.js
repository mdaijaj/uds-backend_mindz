const express = require('express')
const router = express.Router();

const bayManagementController = require('../controllers/bayManagementController');

router.post('/api/v1/createBayManagement',bayManagementController.createBayManagement);
router.get('/api/v1/getBayManagementList',bayManagementController.getBayManagementList);
router.get('/api/v1/getBayManagementByPlantAndWarehouse',bayManagementController.getBayManagementByPlantAndWarehouse);
router.put('/api/v1/updateBayManagement',bayManagementController.updateBayManagement);

router.get('/api/v1/getBayBlockList/:id',bayManagementController.getBayBlockListById)
router.get('/api/v1/getBayBlock/:id',bayManagementController.getBayBlockById)
router.put('/api/v1/editBayBlock',bayManagementController.editBayBlock)

router.get('/api/v1/getBayBlockBayList/:id',bayManagementController.getBayBlockBayList)
router.get('/api/v1/getBayBlockBay/:id',bayManagementController.getBayBlockBayById)
router.put('/api/v1/editBayBlockBay/:id',bayManagementController.editBayBlockBay)

router.delete('/api/v1/deleteBayBlock',bayManagementController.deleteBayBlock)
router.delete('/api/v1/deleteBayBlockBay',bayManagementController.deleteBayBlockBay)
router.delete('/api/v1/deleteBayManagement',bayManagementController.deleteBayManagement)
router.get('/api/v1/getAllBayManagement',bayManagementController.getAllBayManagement)


module.exports = router;