const insuranceController = require("../controller/Insurance.controller");
const { upload } = require("../../../middleware/Insurance_doc");

module.exports = app => {
    app.post("/api/v1/create_Insurance", upload.single('terminate_copy_upload'), insuranceController.create_Insurance);
    app.post("/api/v1/update_Insurance_doc/:id", upload.single('upload_agreement_copy'), insuranceController.update_Insurance_doc);
    app.put("/api/v1/edit_Insurance/:id", upload.fields([{ name: 'terminate_copy_upload', maxCount: 1 }, { name: 'terminate_copy_upload', maxCount: 1 }]),insuranceController.edit_Insurance);
    app.get("/api/v1/get_ById_Insurance/:id", upload.fields([{ name: 'upload_agreement_copy', maxCount: 1 }, { name: 'terminate_copy_upload', maxCount: 1 }]),insuranceController.get_ById_Insurance);
    app.get("/api/v1/get_All_Insurance", insuranceController.get_All_Insurance);
    app.delete("/api/v1/delete_Insurance/:id", insuranceController.delete_Insurance);

}