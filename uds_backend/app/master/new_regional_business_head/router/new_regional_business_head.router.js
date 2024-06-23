const new_regional_business_headController = require("../controller/new_regional_business_head.controller");


module.exports = app => {
    app.post("/api/v1/create_new_regional_business_head", new_regional_business_headController.create_new_regional_business_head);
    app.put("/api/v1/edit_new_regional_business_head/:id", new_regional_business_headController.edit_new_regional_business_head);
    app.get("/api/v1/get_ById_new_regional_business_head/:id", new_regional_business_headController.get_ById_new_regional_business_head);
    app.get("/api/v1/getAll_new_regional_business_head", new_regional_business_headController.getAll_new_regional_business_head);
    app.delete("/api/v1/delete_new_regional_business_head/:id", new_regional_business_headController.delete_new_regional_business_head);
    app.get("/api/v1/get_Bynew_regionId_new_regional_business_head/:id", new_regional_business_headController.get_Bynew_regionId_new_regional_business_head)
}