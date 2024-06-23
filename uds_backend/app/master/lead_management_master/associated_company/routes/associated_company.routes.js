module.exports = app => {
    const associated_CompanyController = require("../controller/associated_company.controller");
 
    app.post("/api/v1/createAssociatedCompany", associated_CompanyController.createAssociatedCompany);
    app.get("/api/v1/getAllAssociatedCompany", associated_CompanyController.getAllAssociatedCompany);
    app.get("/api/v1/getByIdAssociatedCompany/:associated_company_id", associated_CompanyController.getByIdAssociatedCompany);
    app.delete("/api/v1/deleteAssociatedCompany/:associated_company_id", associated_CompanyController.deleteAssociatedCompany);
 
}