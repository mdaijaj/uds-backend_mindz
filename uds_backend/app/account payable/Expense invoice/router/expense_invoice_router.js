const Expense_invoice_Controller = require("../controller/expense_invoice_controller");

module.exports = app => {
    app.get("/api/v1/get_expense_invoice", Expense_invoice_Controller.get_expense_invoice);
    app.get("/api/v1/getByID_expense_invoice/:id", Expense_invoice_Controller.getByID_expense_invoice);
  
}