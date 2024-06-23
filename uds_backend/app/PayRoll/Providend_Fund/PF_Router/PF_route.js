const Providend_Fund_Data=require("../PF_Controller/PF_Controller.model")


module.exports = app => {
    app.get("/api/v1/Get_PF_by_id/:id",Providend_Fund_Data.Get_PF_Id)
    app.get("/api/v1/Get_PF_All",Providend_Fund_Data.Get_All_PF)
    app.post("/api/v1/Create_PF",Providend_Fund_Data.Create_PF)
    app.put("/api/v1/Update_PF/:id",Providend_Fund_Data.Update_PF)
    app.delete("/api/v1/Delete_PF_status/:id",Providend_Fund_Data.Delete_status)
    app.delete("/api/v1/Delete_PF/:id",Providend_Fund_Data.Delete_PF)
}