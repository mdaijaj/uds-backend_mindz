const approvalController = require("../controller/approval.controller");


module.exports = app => {
    app.post("/api/v1/create_approval", approvalController.create_approval);
    app.get("/api/v1/getAll_approval", approvalController.getAll_approval);
    app.get("/api/v1/getById_approval/:approval_id", approvalController.getById_approval);
    app.put("/api/v1/updateby_approval/:approval_id", approvalController.updateBy_approval)


}