module.exports = app => {
  const empDocumentDetail = require("../controllers/documentDetails.controller");
  const { upload } = require("../middleware/uploadDocument");

  app.post("/api/v1/empdocumentdetail", upload.single('document_file'), empDocumentDetail.createEmployeeDocument)
  app.put("/api/v1/empdocumentdetailupdate/:emp_document_Id", upload.single('document_file'), empDocumentDetail.updateEmployeeDocument)
}
