const bankDetailsController = require('../controller/bank_Details.controller');

module.exports = app => {
    app.post("/api/v1/create_Bank_Details_Vendor_Management", bankDetailsController.create_Bank_Details_Vendor_Management);
    app.put("/api/v1/edit_Bank_Details_Vendor_Management/:id", bankDetailsController.edit_Bank_Details_Vendor_Management);
    app.get("/api/v1/get_ById_Bank_Details_Vendor_Management/:id", bankDetailsController.get_ById_Bank_Details_Vendor_Management);
    app.get("/api/v1/get_All_Bank_Details_Vendor_Management", bankDetailsController.get_All_Bank_Details_Vendor_Management);
    app.delete("/api/v1/delete_Bank_Details/:id", bankDetailsController.delete_Bank_Details);
};