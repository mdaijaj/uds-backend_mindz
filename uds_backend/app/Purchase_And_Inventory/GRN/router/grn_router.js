const GRNDetails = require('../controller/grnController');
const { upload } = require("../../../middleware/GRN");
module.exports = app => {
    app.post("/api/v1/createGRN", upload.single('invoiceDoc'), GRNDetails.createGRN);
    app.get("/api/v1/getAllGRN",  GRNDetails.getAllGRN);
    app.get("/api/v1/getbyIDGRN/:id",  GRNDetails.getbyIDGRN);
    app.delete("/api/v1/GRNDelete/:id",  GRNDetails.GRNDelete);
    app.put("/api/v1/updateGRN/:id", upload.single('invoiceDoc'), GRNDetails.updateGRN);
    app.get("/api/v1/get_all_po", GRNDetails.get_all_po);
    app.get("/api/v1/get_all_po_id/:id", GRNDetails.get_all_po_id);
    app.post("/api/v1/createdata_grn", GRNDetails.createdata_grn);
    app.get("/api/v1/createCode/:id", GRNDetails.createCode);
    app.get("/api/v1/get_by_Id_grn", GRNDetails.get_by_Id_grn);
    app.put("/api/v1/updateData_GRN/:id", GRNDetails.updateData_GRN);
    app.get("/api/v1/get_all_grnItem_id/:po_item_id", GRNDetails.get_all_grnItem_id);
    // app.get("/api/v1/get_all_po_id_grn/:id", GRNDetails.get_all_po_id_grn);
}