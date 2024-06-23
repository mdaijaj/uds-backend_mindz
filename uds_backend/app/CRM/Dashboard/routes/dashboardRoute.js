const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

router.get('/api/v1/getDashboard', dashboardController.getDashboard);


module.exports = router;
