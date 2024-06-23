const vendorManagementController = require('../controller/vendor_management.controller');
const { upload } = require("../../../middleware/vendor_Management_Pdf");

module.exports = app => {
    app.post("/api/v1/create_Vendor_Management", vendorManagementController.create_Vendor_Management);
    app.put("/api/v1/edit_Basic_Details_Vendor_Management/:id", vendorManagementController.edit_Basic_Details_Vendor_Management);
    app.put("/api/v1/edit_BankDetail_Vendor_Management/:id", vendorManagementController.edit_BankDetail_Vendor_Management);
    app.put("/api/v1/edit_Document_Vendor_Management/:id", upload.fields([{ name: 'upload_document', maxCount: 1 }]), vendorManagementController.edit_Document_Vendor_Management);
    app.put("/api/v1/verify_Vendor_Management/:id", vendorManagementController.verify_Vendor_Management);
    app.get("/api/v1/get_All_Verfiy_Vendor_Management", vendorManagementController.get_All_Verfiy_Vendor_Management);
    app.get("/api/v1/get_ById_Vendor_Management/:id", vendorManagementController.get_ById_Vendor_Management);
    app.get("/api/v1/get_All_Vendor_Management", vendorManagementController.get_All_Vendor_Management);
    app.get("/api/v1/get_All_Active_Vendor_Management", vendorManagementController.get_All_Active_Vendor_Management);
    app.get("/api/v1/get_All_Account_Approved_Vendor_Management", vendorManagementController.get_All_Account_Approved_Vendor_Management);
    app.get("/api/v1/get_All_Reject_Vendor_Management", vendorManagementController.get_All_Reject_Vendor_Management);
    app.get("/api/v1/get_All_Inactive_Vendor_Management", vendorManagementController.get_All_Inactive_Vendor_Management);
    app.put("/api/v1/edit_Status_Vendor_Management/:id", vendorManagementController.edit_Status_Vendor_Management);
    app.delete("/api/v1/delete_Vendor_Management/:id", vendorManagementController.delete_Vendor_Management);
};