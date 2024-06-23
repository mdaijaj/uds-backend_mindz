module.exports = app => {
    const countryController = require("../controller/country.controller");
 
    app.post("/api/v1/createcountry", countryController.createcountry);
    app.get("/api/v1/getAllcountry", countryController.getAllcountry);
    app.get("/api/v1/getByIdcountry/:countryss_id", countryController.getByIdcountry);
    app.delete("/api/v1/deletecountry/:countryss_id", countryController.deletecountry);
    app.put("/api/v1/editcountry/:countryss_id", countryController.editcountry);
}