const onboarding_controller=require("./onboarding_controller")
const {upload_docs}=require("../middleware/New_candidate_onboarding")


module.exports=app=>{
    app.post("/api/v1/create_new_employee_details",upload_docs.single("document"),onboarding_controller.create_new_emp)
    app.patch("/api/v1/candidate_personal_details/:id",onboarding_controller.creating_candidate_personal_info)
    
    app.patch("/api/v1/candidate_document_details/:id",upload_docs.single("docs"),onboarding_controller.candidate_document_details)
    app.get("/api/v1/get_all_form_submitted_candidate/:id",onboarding_controller.get_all_form_submitted)
    app.get("/api/v1/get_onboading_candidate/:id/:emp_id",onboarding_controller.get_onboarding_candidate_by_id)
    app.patch("/api/v1/hr_approving_candidate/:id",onboarding_controller.Hr_approving_candidate)
    app.get("/api/v1/get_all_approved_onboarding/:id",onboarding_controller.get_all_Onboarding_approved_emp)
    app.get("/api/v1/get_by_id_approved_onboarding/:id/:emp_id",onboarding_controller.Get_by_id_approved_Onboarding)
    app.delete("/api/v1/delete_onboading_candidate/:id/:emp_id",onboarding_controller.delete_onboaring_candidate)
    app.delete("/api/v1/permanent_delete_onboading_candidate/:id/:emp_id",onboarding_controller.permanent_delete_onboaring_candidate)

}