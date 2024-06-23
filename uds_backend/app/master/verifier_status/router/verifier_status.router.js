const verifier_statusController = require("../controller/verifier_status.controller");


module.exports = app => {
    app.post("/api/v1/create_verifier_status", verifier_statusController.create_verifier_status );
    app.put("/api/v1/edit_verifier_status/:id", verifier_statusController.edit_verifier_status);
    app.get("/api/v1/get_ById_verifier_status/:id", verifier_statusController.get_ById_verifier_status);
    app.get("/api/v1/getAll_verifier_status", verifier_statusController.getAll_verifier_status);
    app.delete("/api/v1/delete_verifier_status/:id", verifier_statusController.delete_verifier_status)
}