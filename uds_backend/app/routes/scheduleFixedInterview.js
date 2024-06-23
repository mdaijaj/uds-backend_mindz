const schedulefixedInterviewController = require("../controllers/scheduleFixedInterview");

module.exports = app => {
    app.post("/api/v1/schedule_FixedInterview", schedulefixedInterviewController.schedule_FixedInterview);
    app.patch("/api/v1/schedule_interview_Date/:id",schedulefixedInterviewController.schdule_interview_date)
    app.put("/api/v1/editSchedule_FixedInterview/:id", schedulefixedInterviewController.editSchedule_FixedInterview);
    app.post("/api/v1/reject_fixedinterview/:id", schedulefixedInterviewController.reject_fixedinterview);
    app.get("/api/v1/getallassignby", schedulefixedInterviewController.get_All_Assign_By);
    app.get("/api/v1/final_Shortlisted_Candidate", schedulefixedInterviewController.final_Shortlisted_Candidate);
    app.put("/api/v1/final_update_ShortlistedCandidate/:id", schedulefixedInterviewController.final_update_ShortlistedCandidate);
    app.get("/api/v1/get_all_managers",schedulefixedInterviewController.get_All_manager)
}