const Program_Estimate = require("../controller/Program_Estimate.controller")


module.exports = app => {
   app.post("/api/v1/create_Program_Estimate",Program_Estimate.create_Program_Estimate)
   app.put("/api/v1/update_Program_Estimate/:Program_Estimate_id",Program_Estimate.edit_Program_Estimate)
   app.put("/api/v1/update_overshot/:Program_Estimate_id",Program_Estimate.edit_update_overshot)
   app.put("/api/v1/update_assimption/:Program_Estimate_id",Program_Estimate.update_assimption)


   app.get("/api/v1/getById_Program_Estimate/:Program_Estimate_id",Program_Estimate.getById_Program_Estimate)
   app.get("/api/v1/getby_open_house_training_id/:open_house_training_id",Program_Estimate.getby_open_house_training_id)
   // getby_open_house_training_id
   app.put("/api/v1/delete_Program_Estimate/Program_Estimate_id",Program_Estimate.delete_Program_Estimate)
   app.get("/api/v1/getAll__Program_Estimate",Program_Estimate.getAll__Program_Estimate)

}