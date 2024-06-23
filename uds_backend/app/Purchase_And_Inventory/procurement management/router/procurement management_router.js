const ProcurementController = require("../controller/procurement management_controller");
const { upload } = require("../../../middleware/item_master");


module.exports = app => {
    app.post("/api/v1/Create_PR_request", upload.fields([{ name: 'file', maxCount: 1 }]), ProcurementController.Create_PR_request);
    app.put("/api/v1/editPR_request/:id", upload.fields([{ name: 'file', maxCount: 1 }]), ProcurementController.editPR_request);
    app.post("/api/v1/getAll_Approved_pr/:id", ProcurementController.getAll_Approved_pr);
    app.post("/api/v1/getAll_Rejected_pr/:id", ProcurementController.getAll_Rejected_pr);
    app.get("/api/v1/getAll_to_be_approve_pr/:id", ProcurementController.getAll_to_be_approve_pr);
    app.post("/api/v1/create_Approved", ProcurementController.create_Approved);
    app.post("/api/v1/getAll_Approvel_level/:id", ProcurementController.getAll_Approval_level);
    app.get("/api/v1/get_ById_Approver/:id", ProcurementController.get_ById_Approver);
    app.put("/api/v1/update_approvel_status/:id", ProcurementController.update_approvel_status);
    app.put("/api/v1/delete_product/:id", ProcurementController.delete_product);
    app.post("/api/v1/getAll_Product/:id", ProcurementController.getAll_Product);
    app.get("/api/v1/getAll_Product_ById/:id", ProcurementController.getAll_Product_ByID);
    app.get("/api/v1/getBy_id/:id", ProcurementController.getBy_id);
    app.get("/api/v1/GetAll_liveRFP", ProcurementController.GetAll_liveRFP);
    app.get("/api/v1/GetAll_CloseRFP", ProcurementController.GetAll_CloseRFP);
    app.put("/api/v1/update_endDate/:id", ProcurementController.update_endDate);
    app.post("/api/v1/update_status/:id", ProcurementController.update_status);
    app.post("/api/v1/get_ById_PR", ProcurementController.get_ById_PR);
    app.get("/api/v1/getAll_vendor_pr/:id", ProcurementController.getAll_vendor_pr);
    app.get("/api/v1/GetAll_Approved_vendor", ProcurementController.GetAll_Approved_vendor);
    app.get("/api/v1/GetAll_Approved_Cost", ProcurementController.GetAll_Approved_Cost);
    app.get("/api/v1/GetAll_rejected", ProcurementController.GetAll_rejected);
    app.get("/api/v1/GetData_vendor_id/:id", ProcurementController.GetData_vendor_id);
    app.put("/api/v1/quotation_approvel/:id", ProcurementController.quotation_approvel);
    app.put("/api/v1/approvel_cost_rejected/:id", ProcurementController.approvel_cost_rejected);
    app.put("/api/v1/delete_live_rfp/:id", ProcurementController.delete_live_rfp);
    app.put("/api/v1/checked_value_ture/:id", ProcurementController.checked_value_ture);
    app.put("/api/v1/sendRFP",upload.single("file"), ProcurementController.sendRFP);
    app.put("/api/v1/sendRFPforService",upload.single("file"), ProcurementController.sendRFP_for_Service);
    app.put("/api/v1/sendRFPforBOM",upload.single("file"), ProcurementController.sendRFP_for_BOM);
    // app.put("/api/v1/update_grn/:id",upload.single("grn_file"), ProcurementController.update_grn);
    app.put("/api/v1/update_vendorData/:id", upload.fields([{ name: 'vendor_uploaded_document', maxCount: 1 }]), ProcurementController.update_vendorData);
    app.put("/api/v1/update_vendorDataforService/:id", upload.fields([{ name: 'vendor_uploaded_document', maxCount: 1 }]), ProcurementController.update_vendorData_for_service);
    app.get("/api/v1/getAll_Approved_pr_getBy_id/:id", ProcurementController.getAll_Approved_pr_getBy_id);
    app.put("/api/v1/invoice_status_update/:id",upload.single("invoice_file"), ProcurementController.invoice_status_update);
   app.put("/api/v1/budget_approvel/:department_name",ProcurementController.budget_approvel)
   app.get("/api/v1/getAll_budget",ProcurementController.getAll_budget)
   app.get("/api/v1/inventory_Data",ProcurementController.inventory_Data)
   app.get("/api/v1/getVendor_replyData/:id",ProcurementController.getVendor_replyData)
   app.get("/api/v1/getVendor_replyDataforBOM",ProcurementController.getVendor_replyData_for_bom)
   app.get("/api/v1/getVendor_replyDataforService",ProcurementController.getVendor_replyData_for_service)
   app.get("/api/v1/get_Approved_pr", ProcurementController.get_Approved_Pr);
   app.get("/api/v1/create_rfp_number", ProcurementController.create_Rfp_Number);
   app.post("/api/v1/stopliverfp/:id", ProcurementController.stop_live_rfp);
   app.patch("/api/v1/check_workflow_ByCategory", ProcurementController.check_workflow_ByCategory);

}