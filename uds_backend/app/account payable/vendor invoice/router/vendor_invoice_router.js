const Vendor_invoice_Controller = require("../controller/vendor_invoice_controller");

module.exports = app => {
    app.get("/api/v1/get_vendor_invoice", Vendor_invoice_Controller.get_vendor_invoice);
    app.get("/api/v1/getByID_vendorexpense_invoice/:id", Vendor_invoice_Controller.getByID_vendorexpense_invoice);
  
}