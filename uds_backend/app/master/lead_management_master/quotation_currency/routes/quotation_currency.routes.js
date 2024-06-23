module.exports = app => {
    const quotation_currencyController = require("../controller/quotation_currency.controller");
 
    app.post("/api/v1/createQuotation_currency", quotation_currencyController.createQuotation_currency);
    app.get("/api/v1/getAllQuotation_currency", quotation_currencyController.getAllQuotation_currency);
    app.get("/api/v1/getByIdQuotation_currency/:quotation_currency_id", quotation_currencyController.getByIdQuotation_currency);
    app.delete("/api/v1/deleteQuotation_currency/:quotation_currency_id", quotation_currencyController.deleteQuotation_currency);
    app.put("/api/v1/editQuotation_currency/:quotation_currency_id", quotation_currencyController.editQuotation_currency);
    app.put("/api/v1/updateQuotation_currencyStatus/:quotation_currency_id", quotation_currencyController.updateQuotation_currencyStatus);
}