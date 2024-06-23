const certificate_StatusController = require("../controller/Certificate_status_typ.controller");


module.exports = app => {
    app.post("/api/v1/createCertificateStatus", certificate_StatusController.createCertificateStatus);
    app.get("/api/v1/getAllCertificateStatus", certificate_StatusController.getAllCertificateStatus);
    app.get("/api/v1/getByIdCertificateStatus/:certificate_status_id", certificate_StatusController.getByIdCertificateStatus);
    app.delete("/api/v1/deleteCertificateStatus/:certificate_status_id", certificate_StatusController.deleteCertificateStatus);
    app.put("/api/v1/editCertificateStatus/:certificate_status_id", certificate_StatusController.editCertificateStatus);
}
