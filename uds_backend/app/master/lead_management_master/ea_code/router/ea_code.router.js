const emCodeController = require("../controller/ea_code.controller");


module.exports = app => {
    app.post("/api/v1/create_ea_code", emCodeController.create_ea_code );
    app.put("/api/v1/edit_ea_code/:id", emCodeController.edit_ea_code);
    app.get("/api/v1/get_ById_ea_code/:id", emCodeController.get_ById_ea_code);
    app.get("/api/v1/getAll_ea_code", emCodeController.getAll_ea_code);
    app.delete("/api/v1/delete_ea_code/:id", emCodeController.delete_ea_code)
}