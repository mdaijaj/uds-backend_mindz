const dqsgroupMasterController = require("../controller/DQS_Group_Master.controller");
module.exports = app => {
    app.post("/api/v1/create_dqsGroup_Master", dqsgroupMasterController.create_dqsGroup_Master);
    app.get("/api/v1/getAll_dqsGroup_Master", dqsgroupMasterController.getAll_dqsGroup_Master);
    app.put("/api/v1/edit_dqsGroup_Master/:id", dqsgroupMasterController.edit_dqsGroup_Master);
    app.get("/api/v1/getById_dqsGroup_Master/:dqs_group_id", dqsgroupMasterController.getById_dqsGroup_Master);
    app.delete("/api/v1/delete_dqsGroup_Master/:id", dqsgroupMasterController.delete_dqsGroup_Master)
}