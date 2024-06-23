const controller = require("../controllers/officeLocation.contolller.js");

module.exports = function (app) {
  app.post("/api/v1/officeLocation", controller.officeLocationTestdata);
  app.get("/api/v1/officeLocationall", controller.officeLocationTest);
  app.get("/api/v1/officeLocation/:work_physical_location_id", controller.officeLocationTestById);
  app.patch("/api/v1/officeLocation/:work_physical_location_id", controller.updateOfficeLocation);
  app.patch("/api/v1/officeLocationTest/:work_physical_location_id", controller.officeLocationTestdataStatus);
}