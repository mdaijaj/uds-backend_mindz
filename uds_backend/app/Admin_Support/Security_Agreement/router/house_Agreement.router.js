const house_agreementController = require("../controller/house_Agreement.controller");
const { upload } = require("../../../middleware/House_aggrement_doc");

module.exports = app => {
    app.post("/api/v1/create_Security_Agreement",upload.single('terminate_copy_upload'),   house_agreementController.create_Security_Agreement);
    app.post("/api/v1/update_house_Agreement_doc/:id", upload.single('upload_agreement_copy'),  house_agreementController.update_house_Agreement_doc);
    app.put("/api/v1/edit_Security_Agreement/:id",upload.fields([{ name: 'upload_agreement_copy', maxCount: 1 }, { name: 'terminate_copy_upload', maxCount: 1 }]),  house_agreementController.edit_Security_Agreement);
    app.get("/api/v1/get_ById_Security_Agreement/:id", house_agreementController.get_ById_Security_Agreement);
    app.get("/api/v1/get_All_Security_Agreement", house_agreementController.get_All_Security_Agreement);
    app.delete("/api/v1/delete_Security_Agreement/:id", house_agreementController.delete_Security_Agreement);

}