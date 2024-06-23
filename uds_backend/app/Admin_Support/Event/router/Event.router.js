const eventController = require("../controller/Event.controller");
const { upload } = require("../../../middleware/Event_doc");

module.exports = app => {
    app.post("/api/v1/create_Event", upload.fields([{ name: 'upload_documents_copy', maxCount: 1 }, { name: 'upload_vendor_copy', maxCount: 1 },{ name: 'upload_comparative_copy', maxCount: 1 },{ name: 'upload_sign_copy', maxCount: 1 }]), eventController.create_Event);
    app.put("/api/v1/edit_Event/:id", upload.fields([{ name: 'upload_documents', maxCount: 1 }, { name: 'upload_vendor', maxCount: 1 },{ name: 'upload_comparative', maxCount: 1 },{ name: 'upload_sign', maxCount: 1 }]), eventController.edit_Event);
    app.get("/api/v1/get_ById_Event/:id", eventController.get_ById_Event);
    app.get("/api/v1/get_All_Event", eventController.get_All_Event);
    app.delete("/api/v1/delete_Event/:id", eventController.delete_Event);
    app.get("/api/v1/get_All_Event_Status_Open",eventController.get_All_Event_Status_Open)
    app.get("/api/v1/get_All_Event_Status_Closed",eventController.get_All_Event_Status_Closed)
    app.get("/api/v1/get_All_Event_Status_Rejected",eventController.get_All_Event_Status_Rejected)
    app.get("/api/v1/get_All_Event_Status_Inprogress",eventController.get_All_Event_Status_Inprogress)
}