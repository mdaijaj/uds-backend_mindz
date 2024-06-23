const myPendingTaskController = require("../controllers/my_pending_task.controller")

module.exports = app => {
    app.post("/api/v1/create_My_Pending_Task", myPendingTaskController.create_My_Pending_Task);
    app.put("/api/v1/edit_My_Pending_task/:id", myPendingTaskController.edit_My_Pending_task);
    app.get("/api/v1/getById_My_Pending_task/:id", myPendingTaskController.getById_My_Pending_task);
    app.get("/api/v1/get_All_My_Pending_task", myPendingTaskController.get_All_My_Pending_task);
}