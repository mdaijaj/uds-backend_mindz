const ProcurementPOController = require("../controller/procurement_po_controller");
const { upload } = require("../../../middleware/item_master");


module.exports = app => {
    app.post("/api/v1/Create_PO_request", upload.fields([{ name: 'po_attached_doc', maxCount: 1 }]), ProcurementPOController.Create_PO_request);
    app.post("/api/v1/get_all_po", ProcurementPOController.get_all_po);
    app.post("/api/v1/generatePoNumber", ProcurementPOController.generate_Po_No);
    app.get("/api/v1/get_to_be_approved_po/:emp_id", ProcurementPOController.get_to_be_approved_po);
    app.post("/api/v1/approved_po_ByPO_ID/:po_id", ProcurementPOController.approved_po_ByPO_ID);
    app.post("/api/v1/getAll_draft_po", ProcurementPOController.getAll_draft_po);
    app.post("/api/v1/get_all_Approved_PO", ProcurementPOController.get_all_Approved_PO);
    app.post("/api/v1/get_all_Rejected_PO", ProcurementPOController.get_all_Rejected_PO);
    app.get("/api/v1/getAll_PO_Approval_level/:po_id", ProcurementPOController.getAll_PO_Approval_level);
    app.post("/api/v1/get_po_Byid/:po_id", ProcurementPOController.get_po_Byid);
    app.post("/api/v1/get_budget_details", ProcurementPOController.get_budget_details);
    app.put("/api/v1/update_draft_po/:po_id",upload.fields([{ name: 'po_attached_doc', maxCount: 1 }]), ProcurementPOController.update_draft_po);
    app.post("/api/v1/Create_PO_BY_PR_request", upload.fields([{ name: 'po_attached_doc', maxCount: 1 }]), ProcurementPOController.Create_PO_BY_PR_request);
}