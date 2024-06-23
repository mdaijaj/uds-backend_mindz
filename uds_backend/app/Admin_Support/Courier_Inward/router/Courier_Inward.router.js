const courierInwardController = require("../controller/Courier_Inward.controller");


module.exports = app => {
    app.post("/api/v1/create_Courier_Inward/:id", courierInwardController.create_Courier_Inward);
    app.put("/api/v1/edit_Courier_Inward/:id", courierInwardController.edit_Courier_Inward);
    app.get("/api/v1/get_ById_Courier_Inward/:id", courierInwardController.get_ById_Courier_Inward);
    app.get("/api/v1/get_All_Courier_Inward/:id", courierInwardController.get_All_Courier_Inward);
    app.delete("/api/v1/delete_Courier_Inward/:id", courierInwardController.delete_Courier_Inward);
    app.get("/api/v1/getById_emp/:id", courierInwardController.getById_emp);
    app.get("/api/v1/getAll_courier_Data/:id", courierInwardController.getAll_courier_Data);
    app.patch("/api/v1/courier_Accept/:id",courierInwardController.courier_Accepted)
    app.patch("/api/v1/courier_Reject/:id",courierInwardController.courier_Rejected)
    app.patch("/api/v1/courier_Redirected/:id",courierInwardController.courier_Redirected)
    app.get("/api/v1/get_all_employee_inward/:id",courierInwardController.Inward_employee)
    app.get("/api/v1/courier_Redirected_Data/:id/",courierInwardController.courier_Redirected_Data)
    app.patch("/api/v1/courier_Redirected_update_status",courierInwardController.courier_Redirected_status)
    app.patch("/api/v1/courier_status_Admin/:id",courierInwardController.courier_status_Admin)
    app.patch("/api/v1/courier_Redirected_admin_response/:id",courierInwardController.courier_redirected_Admin_update)
    app.patch("/api/v1/courier_handover_admin/:id",courierInwardController.handover_by_admin)
}