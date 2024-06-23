const forex_currencyController = require("../controller/forex_currency_controller");
const { upload } = require("../../../middleware/Rental_Agreement_doc");

module.exports = app => {
    // Without Task order Forex Currency
    app.post("/api/v1/create_forex_currenct_without_t_o", forex_currencyController.create_forex_currenct_without_t_o);
    app.get("/api/v1/getAll_list_forex_currency", forex_currencyController.getAll_list_forex_currency);
    app.put("/api/v1/approval_forex_currency/:id", forex_currencyController.approval_forex_currency);
    app.get("/api/v1/get_ById_without/:id", forex_currencyController.get_ById_without);
    app.put("/api/v1/update_forex_currency_rate/:id", upload.fields([{ name: 'upload_memo_copy', maxCount: 1 }, { name: 'lerms_letter', maxCount: 1 }]), forex_currencyController.update_forex_currency_rate);
    // With Task Order Forex Currency

    app.get("/api/v1/getAll_To_list_forex_currency", forex_currencyController.getAll_To_list_forex_currency);
    app.put("/api/v1/approval_To_forex_currency/:id", forex_currencyController.approval_To_forex_currency);
    app.put("/api/v1/update_To_forex_currency_rate/:id", upload.fields([{ name: 'upload_memo_copy', maxCount: 1 }, { name: 'lerms_letter', maxCount: 1 }]), forex_currencyController.update_To_forex_currency_rate);
    app.get("/api/v1/get_ById_with_Taskorder/:id", forex_currencyController.get_ById_with_Taskorder);
    // Return Forex Currency
    app.get("/api/v1/get_ById_return/:id", forex_currencyController.get_ById_return);
    app.get("/api/v1/getAll_return_forex_currency", forex_currencyController.getAll_return_forex_currency);
    app.put("/api/v1/update_Return_forex_currency/:id", upload.fields([{ name: 'upload_Encashment_Letter', maxCount: 1 }, { name: 'upload_Cash_Receipt', maxCount: 1 }]), forex_currencyController.update_Return_forex_currency);
    app.put("/api/v1/approval_Return_forex_currency/:id", forex_currencyController.approval_Return_forex_currency);
}