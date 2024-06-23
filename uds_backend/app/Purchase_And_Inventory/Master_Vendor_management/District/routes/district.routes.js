const districtController = require("../controller/district.controller");

module.exports = app => {
    app.post("/api/v1/create_District", districtController.create_District);
    app.put("/api/v1/edit_District/:id", districtController.edit_District);
    app.get("/api/v1/get_ById_District/:id", districtController.get_ById_District);
    app.get("/api/v1/get_All_District", districtController.get_All_District);
    app.delete("/api/v1/delete_District/:id", districtController.delete_District)
}