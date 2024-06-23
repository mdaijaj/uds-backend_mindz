const verificationStatusController = require("../controller/verification_status.controller");

module.exports = app => {
    app.post("/api/v1/create_Verification_Status", verificationStatusController.create_Verification_Status);
    app.get("/api/v1/get_All_Verification_Status", verificationStatusController.get_All_Verification_Status);
}