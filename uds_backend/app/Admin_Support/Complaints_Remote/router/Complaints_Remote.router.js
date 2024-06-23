const complaintsController = require("../controller/Complaints_Remote.controller");
const { upload } = require("../../../middleware/Complaints_Remote_doc");

module.exports = app => {
    app.post("/api/v1/create_Complaints_Remote", upload.fields([{ name: 'upload_documents', maxCount: 1 }, { name: 'upload_vendor', maxCount: 1 },{ name: 'upload_comparative', maxCount: 1 },{ name: 'upload_sign', maxCount: 1 }]), complaintsController.create_Complaints_Remote);
    app.put("/api/v1/edit_Complaints_Remote/:id", upload.fields([{ name: 'upload_documents', maxCount: 1 }, { name: 'upload_vendor', maxCount: 1 },{ name: 'upload_comparative', maxCount: 1 },{ name: 'upload_sign', maxCount: 1 }]), complaintsController.edit_Complaints_Remote);
    app.get("/api/v1/get_ById_Complaints_Remote/:id", complaintsController.get_ById_Complaints_Remote);
    app.get("/api/v1/get_All_Complaints_Remote", complaintsController.get_All_Complaints_Remote);
    app.delete("/api/v1/delete_Complaints_Remote/:id", complaintsController.delete_Complaints_Remote);

}