const HRMS_notification_controller = require("../controller/notification_controller")
module.exports=app=>{
    app.post("/api/v1/create_hrms_notifications",HRMS_notification_controller.create_notification)
    app.get("/api/v1/get_by_id_hrms_notifications/:id",HRMS_notification_controller.notification_by_id)
    app.delete("/api/v1/delete_hrms_notifications/:id",HRMS_notification_controller.Delete_notification)
}