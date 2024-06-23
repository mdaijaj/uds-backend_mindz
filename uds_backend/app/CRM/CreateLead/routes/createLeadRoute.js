const express = require("express");
const router = express.Router();

const createLeadController = require("../controllers/createLeadController");

router.post("/api/v1/createLead", createLeadController.createLead);
router.get("/api/v1/getLeadData", createLeadController.getLeadData);

router.get('/api/v1/getFormDetails',createLeadController.getFormDetails);
router.get('/api/v1/getStatusName/:id',createLeadController.getStatusName);
router.get('/api/v1/viewDescription/:id',createLeadController.viewDescription);
router.patch('/api/v1/updateLeadData/:id',createLeadController.updateLeadData);
module.exports = router;
