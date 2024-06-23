const ESI_Controller=require("../ESI_Controller/Esi_controller")

module.exports = app => {
    app.get("/api/v1/Get_ESI_by_id/:id",ESI_Controller.Get_ESI_ID)
    app.get("/api/v1/Get_AllPF_Data",ESI_Controller.Get_All_Esi)
    app.post("/api/v1/Create_ESI",ESI_Controller.Create_ESI)
    app.put("/api/v1/Update_ESI_Data/:id",ESI_Controller.Update_ESI_Data)
    app.delete("/api/v1/Delete_ESI/:id",ESI_Controller.Delete_ESI_Data)
    app.delete("/api/v1/Update_ESI_Status/:id",ESI_Controller.Update_status)
}