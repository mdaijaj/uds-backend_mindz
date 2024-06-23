const couriercontainsController = require("../controller/Courier_Contains.controller");


module.exports = app => {
    app.post("/api/v1/create_Courier_Contains", couriercontainsController.create_Courier_Contains);
    app.put("/api/v1/edit_Courier_Contains/:id", couriercontainsController.edit_Courier_Contains);
    app.put("/api/v1/update_Courier_Contains_status/:id", couriercontainsController.update_courier_contain_status);
    app.get("/api/v1/get_ById_Courier_Contains/:id", couriercontainsController.get_ById_Courier_Contains);
    app.get("/api/v1/get_All_Courier_Contains", couriercontainsController.get_All_Courier_Contains);
    app.delete("/api/v1/delete_Courier_Contains/:id", couriercontainsController.delete_Courier_Contains);
}