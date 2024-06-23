const Auditor_invoice_Controller = require("../controller/auditor_invoice_controller");

module.exports = app => {
    app.get("/api/v1/get_auditor_invoice", Auditor_invoice_Controller.get_auditor_invoice);
    app.get("/api/v1/getByID_auditor_invoice/:id", Auditor_invoice_Controller.getByID_auditor_invoice);
  
}