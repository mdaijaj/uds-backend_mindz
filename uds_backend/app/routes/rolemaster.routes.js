
module.exports = app => {
  const controller = require("../controllers/rolemaster.controller");

  app.post("/api/v1/rolemaster", controller.createRoleMaster);
  app.get("/api/v1/rolemasterlist", controller.roleMasterList)
  app.get("/api/v1/rolemasterdetails/:id", controller.roleMasterDetails)
  app.put("/api/v1/rolemasterupdate/:id", controller.roleMasterUpdate)
  app.put("/api/v1/rolemasterdelete/:id", controller.roleMasterDeleted)
};