const policyController = require("../controller/Policy.controller");


module.exports = app => {
    app.post("/api/v1/create_Policy", policyController.create_Policy);
    app.put("/api/v1/edit_Policy/:id", policyController.edit_Policy);
    app.get("/api/v1/get_ById_Policy/:id", policyController.get_ById_Policy);
    app.get("/api/v1/get_All_Policy", policyController.get_All_Policy);
    app.delete("/api/v1/delete_Policy/:id", policyController.delete_Policy);

}