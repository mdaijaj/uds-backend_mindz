const express = require('express')
const router = express.Router();

const allocationController = require('../controllers/allocationController');

router.get('/api/v1/getItemsByAsset/:id',allocationController.getItemsByAsset);
router.post('/api/v1/getFilteredItems',allocationController.getFilteredItems);
router.post('/api/v1/createAllocation',allocationController.createAllocation);


module.exports = router;