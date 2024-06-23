const facilityController = require("../controller/Facility_Remote.controller");
const { upload } = require("../../../middleware/Facility_Remote_doc");

module.exports = app => {
    app.post("/api/v1/create_Facility_Remote", upload.fields([{ name: 'upload_documents_copy', maxCount: 1 }, { name: 'upload_vendor_copy', maxCount: 1 }, { name: 'upload_comparative_copy', maxCount: 1 }, { name: 'upload_sign_copy', maxCount: 1 }]), facilityController.create_Facility_Remote);
    app.put("/api/v1/edit_Facility_Remote/:id", upload.fields([{ name: 'upload_documents_copy', maxCount: 1 }, { name: 'upload_vendor_copy', maxCount: 1 }, { name: 'upload_comparative_copy', maxCount: 1 }, { name: 'upload_sign_copy', maxCount: 1 }]),  facilityController.edit_Facility_Remote);
    app.put("/api/v1/upate_Facility_Type_Remote_Status/:id", facilityController.upate_Facility_Type_Remote_Status);
    app.get("/api/v1/get_ById_Facility_Remote/:id", facilityController.get_ById_Facility_Remote);
    app.get("/api/v1/get_All_Facility_Remote", facilityController.get_All_Facility_Remote);
    app.delete("/api/v1/delete_Facility_Remote/:id", facilityController.delete_Facility_Remote);
    app.get("/api/v1/get_All_Open_Facility_Remote", facilityController.get_All_Open_Facility_Remote);
    app.get("/api/v1/get_All_Requested_Facility_Remote", facilityController.get_All_Requested_Facility_Remote);
    app.get("/api/v1/get_All_Complaint_List_Facility_Remote", facilityController.get_All_Complaint_List_Facility_Remote);
    app.get("/api/v1/get_All_Remote_Status_Open",facilityController.get_All_Remote_Status_Open)
    app.get("/api/v1/get_All_Remote_Status_Closed",facilityController.get_All_Remote_Status_Closed)
    app.get("/api/v1/get_All_Remote_Status_Rejected",facilityController.get_All_Remote_Status_Rejected)
}