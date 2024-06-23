const express = require('express')
const router = express.Router();

const contractController = require('../controllers/contractController');

router.get('/api/v1/getContractDetails/:id',contractController.getContractDetails);
router.get('/api/v1/getContractList',contractController.getContractList)

module.exports = router;