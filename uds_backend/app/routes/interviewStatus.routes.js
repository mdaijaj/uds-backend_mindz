const interviewStatusController = require("../controllers/interviewStatus.controller");

module.exports = app => {
    app.get("/api/v1/getAllInterviewStatus", interviewStatusController.getAllInterviewStatus);
    app.put("/api/v1/editInterviewStatus/:id", interviewStatusController.editInterviewStatus);
    app.get("/api/v1/getByIdInterviewStatus/:id", interviewStatusController.getByIdInterviewStatus);
}