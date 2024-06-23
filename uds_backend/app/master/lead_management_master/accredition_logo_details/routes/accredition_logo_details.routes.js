const accredition_logo_detailsController = require("../controller/accredition_logo_details.controller");
const { accredition_csv } = require("../../../../middleware/accredition_csv")

module.exports = app => {
    app.post("/api/v1/createAccredition_logo_details", accredition_logo_detailsController.createoneAccredition_logo_details);
    
    app.post("/api/v1/createoneAccredition_logo_details",  accredition_logo_detailsController.createoneAccredition_logo_details);
    app.post("/api/v1/createoneAccredition_logo_details_csvfile",  accredition_csv.single("csvfile"), accredition_logo_detailsController.createoneAccredition_logo_details_csvfile);


    app.put("/api/v1/editAccredition_logo_details/:accredition_logo_details_id", accredition_logo_detailsController.editAccredition_logo_details);




    app.get("/api/v1/getAllAccredition_logo_details", accredition_logo_detailsController.getAllAccredition_logo_details);


    app.get("/api/v1/getByIdAccredition_logo_details/:accredition_logo_details_id", accredition_logo_detailsController.getByIdAccredition_logo_details);
    app.delete("/api/v1/deleteAccredition_logo_details/:accredition_logo_details_id", accredition_logo_detailsController.deleteAccredition_logo_details);
}