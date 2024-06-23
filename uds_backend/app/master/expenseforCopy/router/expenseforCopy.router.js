const expenseforCopyController = require("../controller/expenseforCopy.controller");


module.exports = app => {
    app.post("/api/v1/create_expenseforCopy", expenseforCopyController.create_expenseforCopy );
    app.put("/api/v1/edit_expenseforCopy/:id", expenseforCopyController.edit_expenseforCopy);
    app.put("/api/v1/update_expenseforCopy_status/:id", expenseforCopyController.update_expenseforCopyStatus);
    app.get("/api/v1/get_ById_expenseforCopy/:id", expenseforCopyController.get_ById_expenseforCopy);
    app.get("/api/v1/getAll_expenseforCopy", expenseforCopyController.getAll_expenseforCopy);
    app.delete("/api/v1/delete_expenseforCopy/:id", expenseforCopyController.delete_expenseforCopy)
}