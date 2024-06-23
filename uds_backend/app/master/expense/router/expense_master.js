const expenseMasterController = require("../controller/expense_master");


module.exports = app => {
    app.post("/api/v1/create_expense_master", expenseMasterController.create_expense_master );
    app.put("/api/v1/update_expense_master/:id", expenseMasterController.update_expense_master);
    app.get("/api/v1/get_ById_expense_master/:id", expenseMasterController.get_ById_expense_master);
    app.get("/api/v1/getAll_expense_master", expenseMasterController.getAll_expense_master);
    app.delete("/api/v1/delete_expense_master/:id", expenseMasterController.delete_expense_master);

}