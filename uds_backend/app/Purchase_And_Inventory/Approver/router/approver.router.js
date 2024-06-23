const approverController = require("../controller/approver.controller")


module.exports = app => {
    app.post("/api/v1/create_Approver", approverController.create_Approver);
    app.put("/api/v1/edit_Approver/:id", approverController.edit_Approver);
    app.get("/api/v1/get_ById_Approver/:id", approverController.get_ById_Approver);
    app.get("/api/v1/get_All_Approver", approverController.get_All_Approver);
    app.delete("/api/v1/delete_Approver/:id", approverController.delete_Approver);
}