module.exports = app => {
    const Dqs_PSIController = require("../controller/dqs_PSI.controller");
 
    app.post("/api/v1/createDqs_PSI", Dqs_PSIController.createDqs_PSI);
    app.get("/api/v1/getAllDqs_PSI", Dqs_PSIController.getAllDqs_PSI);
    app.get("/api/v1/getByIdDqs_PSI/:dqs_product_sector_industry_id", Dqs_PSIController.getByIdDqs_PSI);
    app.delete("/api/v1/deleteDqs_PSI/:dqs_product_sector_industry_id", Dqs_PSIController.deleteDqs_PSI);
 
}