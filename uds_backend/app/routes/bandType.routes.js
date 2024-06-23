const bandTypeController = require("../controllers/bandType.controller.js");
const { authJwt } = require("../middleware");


module.exports = function (app) {
  app.post("/api/v1/createBandType", bandTypeController.createBandType);
  app.put("/api/v1/editBandType/:band_type_id", bandTypeController.editBandType);
  app.get("/api/v1/getAllBandtype", bandTypeController.getAllBandtype);
  app.get("/api/v1/getByIdBandType/:band_type_id",bandTypeController.getByIdBandType);
  app.delete("/api/v1/deleteBandType/:band_type_id", bandTypeController.deleteBandType);
}