module.exports = app => {
    const departmentController = require("../controller/department");

    app.post("/api/v1/createDepartment", departmentController.createDepartment);
    app.get("/api/v1/getAllDepartment", departmentController.getAllDepartment);
    app.get("/api/v1/getAllActiveDepartment", departmentController.getAllActiveDepartment);
    app.get("/api/v1/getByIdDepartment/:id", departmentController.getByIdDepartment);
    app.delete("/api/v1/deleteDepartment/:dept_id", departmentController.deleteDepartment);
    app.put("/api/v1/editDepartment/:dept_id", departmentController.editDepartment);
    app.get('/api/v1/calculate_Buget', departmentController.calculate_Buget)
    // app.put('/api/v1/getByIdDepartment_pro', departmentController.getByIdDepartment_pro)
    app.get('/api/v1/getAllDepartment_pro', departmentController.getAllDepartment_pro)
    app.put("/api/v1/updateDepartmentStatus/:departmentId", departmentController.updateDepartmentStatus);
}