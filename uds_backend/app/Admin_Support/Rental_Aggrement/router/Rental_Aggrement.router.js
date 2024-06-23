const rental_agreementController = require("../controller/Rental_Aggrement.controller");
const { upload } = require("../../../middleware/Rental_Agreement_doc");

module.exports = app => {
    app.post("/api/v1/create_Rental_Aggrement", upload.single('terminate_copy_upload'), rental_agreementController.create_Rental_Aggrement);
    app.post("/api/v1/update_Rental_Aggrement/:id", upload.single('upload_agreement_copy'), rental_agreementController.update_Rental_Aggrement);
    app.put("/api/v1/edit_Rental_Aggrement/:id", upload.fields([{ name: 'terminate_copy_upload', maxCount: 1 }, { name: 'terminate_copy_upload', maxCount: 1 }]), rental_agreementController.edit_Rental_Aggrement);
    app.get("/api/v1/get_ById_Rental_Aggrement/:id", rental_agreementController.get_ById_Rental_Aggrement);
    app.get("/api/v1/get_All_Rental_Aggrement", rental_agreementController.get_All_Rental_Aggrement);
    app.delete("/api/v1/delete_Rental_Aggrement/:id", rental_agreementController.delete_Rental_Aggrement);

}