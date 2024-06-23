const courieroutwardController = require("../controller/Courier_Outward.controller");
const { upload } = require("../../../middleware/Courier_outward_doc");

module.exports = app => {
    app.post("/api/v1/create_Courier_Outward/:id",courieroutwardController.create_Courier_Outward);
    app.patch("/api/v1/edit_Courier_Outward/:id",upload.single("proof_of_delivery"), courieroutwardController.edit_Courier_Outward);
    app.get("/api/v1/get_ById_Courier_Outward/:id/:emp_id", courieroutwardController.get_employee_data);
    app.get("/api/v1/get_All_Courier_Outward/:id", courieroutwardController.get_All_Courier_Outward);
    app.get("/api/v1/get_employee_data/:id",courieroutwardController.employee_data)
    app.delete("/api/v1/delete_Courier_Outward/:id", courieroutwardController.delete_Courier_Outward);

}