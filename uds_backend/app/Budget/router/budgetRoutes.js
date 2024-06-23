const budgetController = require("../controller/budgetController");
module.exports = app => {
    app.post("/api/v1/createBudget", budgetController.createBudget);
    app.get("/api/v1/getAllBudget", budgetController.getAllBudget);
    app.get("/api/v1/getBudgetById/:budget_id", budgetController.getBudgetById);
    app.put("/api/v1/BudgetStatus/:budget_id", budgetController.BudgetStatus);
    app.delete("/api/v1/deteleBudget/:budget_id", budgetController.deteleBudget);
}
