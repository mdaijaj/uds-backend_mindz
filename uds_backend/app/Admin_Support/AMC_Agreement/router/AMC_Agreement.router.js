const amc_agreementController = require("../controller/AMC_Agreement.controller");
const { upload } = require("../../../middleware/AMC_Agreement_doc");

module.exports = app => {
    app.post("/api/v1/create_AMC_Agreement/:id", upload.single('terminate_copy_upload'),  amc_agreementController.create_AMC_Agreement);
    app.post("/api/v1/update_AMC_Agreement/:id", upload.single('upload_agreement_copy'),  amc_agreementController.update_AMC_Agreement);
    app.put("/api/v1/edit_AMC_Agreement/:id", upload.fields([{ name: 'upload_agreement_copy', maxCount: 1 }, { name: 'terminate_copy_upload', maxCount: 1 }]),  amc_agreementController.edit_AMC_Agreement);
    app.get("/api/v1/get_ById_AMC_Agreement/:id", amc_agreementController.get_ById_AMC_Agreement);
    app.get("/api/v1/get_All_AMC_Agreement/:id", amc_agreementController.get_All_AMC_Agreement);
    app.delete("/api/v1/delete_AMC_Agreement/:id", amc_agreementController.delete_AMC_Agreement);

}