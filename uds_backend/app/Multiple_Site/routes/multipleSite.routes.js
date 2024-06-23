const multipleSiteController = require("../controller/multipleSite.controller");

module.exports = app => {
    app.post("/api/v1/createMultipleSite", multipleSiteController.createMultipleSite);
    app.put("/api/v1/editMultipleSite/:id", multipleSiteController.editMultipleSite);
    app.get("/api/v1/getMultipleSiteById/:id", multipleSiteController.getMultipleSiteById);
    app.get("/api/v1/getAllMultipleSite", multipleSiteController.getAllMultipleSite);
    app.delete("/api/v1/deleteMultipleSite/:id", multipleSiteController.deleteMultipleSite)
}