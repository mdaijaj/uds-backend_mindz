module.exports = app => {
    const controller = require("../controllers/employeefamitydetails.controller");

    app.get("/api/v1/employeefamilylist", controller.employeeFamilyDetailsList)
    app.put("/api/v1/employeeupdate/:id", controller.employeeFamilyUpdate)
    app.put("/api/v1/employeedelete/:id", controller.employeeFamilyDeleted)
};