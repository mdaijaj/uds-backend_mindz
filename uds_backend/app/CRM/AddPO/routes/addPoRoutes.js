const express = require('express')
const router = express.Router();

const addPoController = require('../controllers/addPoController')


router.post('/api/v1/createAddPo',addPoController.createAddPo);


module.exports = router;