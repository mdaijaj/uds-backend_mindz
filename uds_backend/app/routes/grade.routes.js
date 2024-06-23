module.exports = app => {
    const controller = require("../controllers/grade.controller");

    app.post("/api/v1/grade", controller.createGrade);
    app.get("/api/v1/gradelist", controller.gradeList)
    app.get("/api/v1/gradedetails/:grade_id", controller.gradeDetails)
    app.put("/api/v1/gradeupdate/:grade_id", controller.gradeUpdate)
    app.put("/api/v1/gradeupdateStatus/:grade_id", controller.update_GradeStatus)
    app.delete("/api/v1/gradedelete/:grade_id", controller.gradeDeleted)
};
