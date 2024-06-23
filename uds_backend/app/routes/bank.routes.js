module.exports = app => {
  const bankController = require("../controllers/bankname.controller");
  const { authJwt } = require("../middleware");


  app.post("/api/v1/createBank", bankController.createBank);
  app.put("/api/v1/editBank/:id", bankController.editBank);
  app.get("/api/v1/bankdetails/getall", bankController.getAllBank);
  app.get("/api/v1/getByIdBank/:id", bankController.getByIdBank);
  app.delete("/api/v1/deleteBank/:id", bankController.deleteBank);
};


