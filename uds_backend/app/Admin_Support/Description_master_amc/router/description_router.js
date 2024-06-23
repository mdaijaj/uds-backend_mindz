const description_controller=require("../controller/description_controller")

module.exports=app=>{
    app.post("/api/v1/create_amc_description",description_controller.create_description)
    app.get("/api/v1/get_by_id_amc_description/:id",description_controller.get_by_id_amc_description)
    app.get("/api/v1/get_all_amc_description",description_controller.get_all_amc_descriptions)
    app.patch("/api/v1/update_amc_description/:id",description_controller.update_amc_description)
    app.put("/api/v1/update_amc_description_status/:id",description_controller.update_amcdescriptionStatus)
    app.delete("/api/v1/delete_amc_description/:id",description_controller.delete_amc_description)
}