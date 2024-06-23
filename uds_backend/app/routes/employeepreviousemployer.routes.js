module.exports = app => {
    const controller = require("../controllers/employeepreviousemployer.controller");

    app.post("/api/v1/employeepreviousemployer", controller.createEmployeePreviousEmployer);
    app.get("/api/v1/employeepreviousemployerlist", controller.employeePreviousEmployerList)
    app.put("/api/v1/employeepreviousemployerupdate/:id", controller.employeePreviousEmployerUpdate)
    app.put("/api/v1/employeepreviousemployerdelete/:id", controller.employeePreviousEmployerDeleted)
};