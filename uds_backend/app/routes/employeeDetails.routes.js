module.exports = app => {
    const controller = require("../controllers/employeeDetailsTest.controller.js");

    app.post("/api/v1/employeeprevious", controller.createEmployeePreviousEmployer);
    app.get("/api/v1/employeepreviouslist", controller.employeePreviousEmployerList)
    app.get("/api/v1/employeepreviouslist/:employee_id", controller.employeePreviousEmployerListById)
    app.patch("/api/v1/employeepreviousUpdate/:employee_id", controller.employeePreviousEmployerUpdate)
    app.put("/api/v1/employeepreviousemployerdelete/:id", controller.employeePreviousEmployerDeleted)
};