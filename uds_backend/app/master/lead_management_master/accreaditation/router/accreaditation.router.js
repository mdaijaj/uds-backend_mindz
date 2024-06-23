const accreaditationController = require("../controller/accreaditation.controller");
const { accredition_csv } = require("../../../../middleware/accredition_csv")

module.exports = app => {
    app.post("/api/v1/create_accreaditation", accreaditationController.create_accreaditation );
    app.post("/api/v1/upload_Csv_Accredition_details", accredition_csv.single("csvfile"), accreaditationController.upload_Csv_Accredition_details)
    app.put("/api/v1/edit_accreaditation/:id", accreaditationController.edit_accreaditation);
    app.get("/api/v1/get_ById_accreaditation/:id", accreaditationController.get_ById_accreaditation);
    app.get("/api/v1/getAll_accreaditation", accreaditationController.getAll_accreaditation);
    app.delete("/api/v1/delete_accreaditation/:id", accreaditationController.delete_accreaditation)
}