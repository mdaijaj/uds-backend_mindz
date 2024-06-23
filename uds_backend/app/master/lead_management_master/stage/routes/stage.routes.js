module.exports = app => {
    const stageController = require("../controller/stage.controller");
 
    app.post("/api/v1/createStage", stageController.createStage);
    app.get("/api/v1/getAllStage", stageController.getAllStage);
    app.get("/api/v1/getByIdStage/:stage_id", stageController.getByIdStage);
    app.delete("/api/v1/deleteStage/:stage_id", stageController.deleteStage);
 
}