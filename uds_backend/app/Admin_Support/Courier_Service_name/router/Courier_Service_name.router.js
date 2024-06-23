const courierServiceController = require("../controller/Courier_Service_name.controller");


module.exports = app => {
    app.post("/api/v1/create_Courier_Service_name", courierServiceController.create_Courier_Service_name);
    app.put("/api/v1/edit_Courier_Service_name/:id", courierServiceController.edit_Courier_Service_name);
    app.put("/api/v1/update_Courier_Service_status/:id", courierServiceController.update_courierServiceStatus);
    app.get("/api/v1/get_ById_Courier_Service_name/:id", courierServiceController.get_ById_Courier_Service_name);
    app.get("/api/v1/get_All_Courier_Service_name", courierServiceController.get_All_Courier_Service_name);
    app.delete("/api/v1/delete_Courier_Service_name/:id", courierServiceController.delete_Courier_Service_name);

}