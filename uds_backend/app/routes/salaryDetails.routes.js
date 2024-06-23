const controller = require("../controllers/salaryDetails.controller.js");

module.exports = function (app) {
  app.post("/api/v1/salaryDetails", controller.createSalaryDetails);
  app.get("/api/v1/salaryDetailsList", controller.salaryDetailsList);
  app.get("/api/v1/salaryDetailsList/:id", controller.salaryDetailsListById);
  app.put("/api/v1/salaryDetailsUpdateById/:id", controller.salaryDeatilsUpdate);
}