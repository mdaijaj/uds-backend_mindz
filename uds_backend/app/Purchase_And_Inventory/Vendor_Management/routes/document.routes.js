const documentController = require('../controller/document.controller');
const { upload } = require("../../../middleware/vendor_Management_Pdf");

module.exports = app => {
    app.post("/api/v1/create_Document_Vendor_Management", upload.fields([{ name: 'upload_document', maxCount: 1 }]), documentController.create_Document_Vendor_Management);
    app.put("/api/v1/edit_Document_Details_Vendor_Management/:id", upload.fields([{ name: 'upload_document', maxCount: 1 }]), documentController.edit_Document_Details_Vendor_Management);
    app.get("/api/v1/get_ById_Document_Vendor_Management/:id", documentController.get_ById_Document_Vendor_Management);
    app.get("/api/v1/get_All_Document_Vendor_Management", documentController.get_All_Document_Vendor_Management);
    app.delete("/api/v1/delete_Document_Vendor_Management/:id", documentController.delete_Document_Vendor_Management);
};