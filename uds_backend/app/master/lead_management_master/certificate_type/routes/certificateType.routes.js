module.exports = app => {
    const certificate_TypeController = require("../controller/certificateType.controller");
 
    app.post("/api/v1/createCertificateType", certificate_TypeController.createCertificateType);
    app.get("/api/v1/getAllCertificateType", certificate_TypeController.getAllCertificateType);
    app.get("/api/v1/getByIdCertificateType/:certificate_type_id", certificate_TypeController.getByIdCertificateType);
    app.delete("/api/v1/deleteCertificateType/:certificate_type_id", certificate_TypeController.deleteCertificateType);
 
}