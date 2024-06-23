const express = require("express");
const router = express.Router();
const masterController = require("../../MasterData/controllers/masterController");

router.get("/api/v1/getCreateModule",masterController.getCreateModuleData);
router.get("/api/v1/getFieldType",masterController.getFieldType);
router.post("/api/v1/createContractLocation", masterController.createContractLocation);
router.get("/api/v1/getContractLocation", masterController.getContractLocation);
router.delete("/api/v1/deleteContractLocation/:id", masterController.deleteContractLocation);

module.exports = router;
