const express = require("express");
const router = express.Router();

const schedulingController= require("../controllers/schedulingController");

router.get('/api/v1/getSchedulingAllocationList', schedulingController.getSchedulingAllocationList);

module.exports = router;
