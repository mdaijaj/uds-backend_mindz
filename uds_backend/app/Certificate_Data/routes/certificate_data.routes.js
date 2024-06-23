const certificateDataController = require("../controller/certificate_data.controller");
const { upload } = require("../../middleware/certificate_data")

module.exports = app => {
    app.post("/api/v1/create_Certificate_Data", certificateDataController.create_Certificate_Data);
    app.get("/api/v1/get_ById_Certificate_Data/:id", certificateDataController.get_ById_Certificate_Data);
    app.get("/api/v1/get_All_Certificate_Data", certificateDataController.get_All_Certificate_Data);
    app.post("/api/v1/upload_Certificate_Data", upload.single("file"), certificateDataController.upload_Certificate_Data)
    app.get("/api/v1/download_Document_Certificate_Data/:fileName", certificateDataController.download_Document_Certificate_Data);
}