const companyController = require('../controllers/company_controller');

module.exports = app => {   
    app.post("/api/v1/create_company", companyController.create_company);
    app.put("/api/v1/update_company/:id", companyController.update_company);
    // app.get("/api/v1/getAll_company", countryController.getAll_company);
    // app.get("/api/v1/getBy_id_company/:id", countryController.getBy_id_company);
};  