const authController = require("../controllers/auth.controller");
const prevEmpDetail = require("../controllers/empDetails.controler")
const { verifySignUp } = require("../middleware");
const { upload } = require("../middleware/upload");

module.exports = app => {
  app.post("/api/auth/signup", upload.single("employee_photo"), [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], authController.signup);
  app.post("/api/auth/create_candidate", upload.single("employee_photo"), authController.create_candidate)
  app.post("/api/auth/signin", authController.signin);
  app.get("/api/v1/get_ById_user/:id", authController.get_ById_user);
  app.post("/api/auth/generateEmpCode", authController.generate_Employee_Code);
  // app.post("/api/auth/getStatusForCode", authController.get_Value_Of_Employee_Code)
  app.post("/api/auth/logout", authController.logout);
  app.post("/api/auth/forgetPassword", authController.forgetPassword);
  app.get("/api/auth/registrationall", authController.alluserlist);
  app.get("/api/auth/allsalesPreson", authController.allsalesPreson);
  app.get("/api/auth/alll1approver", authController.alll1approver);
  app.get("/api/auth/alll2approver", authController.alll2approver);
  app.get("/api/auth/form_submit_status/:id", authController.get_candidates_final_formsubmit)
  // alll2approveru

  app.patch("/api/v1/updateemp_paymentAccount/:id", authController.create_employee_paymentaccount)
  app.get("/api/auth/registrationallName", authController.alluserlistName);
  app.patch("/api/v1/candidate_previous_employement_detail/:id", authController.create_previous_employement)
  // app.patch("")
  // get_All_Aduitor
  app.get("/api/auth/get_All_Aduitorlistwithname", authController.get_All_Aduitorlistwithname);
  app.get("/api/v1/get_all_unverifid_emp", authController.get_all_unapproved_emp)
  app.patch("/api/v1/apprrove_pending_emp/:id", authController.approved_unapproved_emp)
  app.get("/api/v1/get_all_user_roles", authController.get_all_role)
  app.post("/api/v1/sending_status_on_form_submit/:id", authController.send_form_status)
  app.get("/api/auth/allListGlobalSalesManager", authController.allListGlobalSalesManager);
  app.get("/api/auth/allListAgent", authController.allListAgent);

  // allListAgent
  app.get("/api/auth/allListRegionalBusinessHead", authController.allListRegionalBusinessHead);
  app.get("/api/auth/userbyid/:employee_id", authController.userById);
  app.get("/api/auth/get_employee_by_id/:id", authController.emp_by_id);
  app.get("/api/auth/get_present_Details_Single/:employee_id", authController.get_present_Details_Single);
  app.put("/api/auth/update_present_Details_Single/:employee_id", authController.update_present_Details_Single);
  app.put("/api/auth/updateByEmployee_id/:employee_id", upload.single("employee_photo"), authController.userUpdateByEmployId);
  app.put("/api/auth/updateEmpDetail/:employee_id", authController.userDetailUpdate);
  app.put("/api/auth/deleteEmpDetail/:employee_id", authController.userDetailDelete);
  app.get("/api/auth/alluserlistbyEmpid/:employee_id", authController.alluserlistbyEmpid);
  app.put("/api/v1/salaryDetailsUpdateByemployee_id/:employee_id", authController.salaryDetailsUpdateapi)
  // app.get("/api/v1_get_employee/:id",authController.employee_data)
  /////////////// Employee Details ///////////////
  app.post("/api/v1/familydetail", prevEmpDetail.createEmployeeFamilyDetail);
  app.put("/api/v1/familydetailupdate/:employId", prevEmpDetail.updateFamilyDetails);
  app.post("/api/v1/prevempdetail", prevEmpDetail.createEmpPrevDetail);
  app.put("/api/v1/prevempdetailupdate/:employId", prevEmpDetail.updateEmpPrevDetail);
  app.patch("/api/v1/update_previous_detail_emp/:id", prevEmpDetail.update_previous_details)
  app.put("/api/v1/updatedetails/:employId", upload.single("employee_photo"), prevEmpDetail.updateEmpDetails);
  app.get("/api/v1/allformempList", prevEmpDetail.allFormEmployeeList);
  app.put("/api/v1/userupdateEmp/:id", prevEmpDetail.userupdateEmp);

  app.get("/api/v1/job/verticle/list", prevEmpDetail.allverticles);
  app.post("/api/v1/job/typecreate", prevEmpDetail.typecreate);

  app.put("/api/v1/job/updatejobdetails/:jobId", prevEmpDetail.updatejobdetails);
  app.get("/api/v1/getprevempdetails/:employId", prevEmpDetail.getPrevEmpDetails);
  app.get("/api/v1/getfamilydetails/:employId", prevEmpDetail.getFamilyDetails);
  app.get("/api/v1/getsalarydetails/:employId", prevEmpDetail.getSalaryDetails);
  app.get("/api/v1/getdocumentdetails/:employId", prevEmpDetail.getDocumentDetails);
  app.put("/api/v1/deleteprevempdetails/:prev_id", prevEmpDetail.deletePrevEmpDetails);
  app.put("/api/v1/deletedocumentdetails/:emp_document_id", prevEmpDetail.deleteDocumentDetails);
  app.put("/api/v1/deletefamilydetails/:family_id", prevEmpDetail.deleteFamilyDetails);
  app.get("/api/v1/get_aduitor_emp", authController.get_All_Aduitor)
  app.put("/api/v1/update_auditor_data/:id", authController.Update_Auditor_byid)
  app.post("/api/v1/get_auditor_Data", authController.get_auditor_data);


  app.get("/api/v1/get_all_employeeBy_User_role/:role_masterId", authController.get_all_employeeBy_User_role);
  app.post("/api/v1/changePassword", authController.changePassword);
  app.post("/api/v1/forgotSendOtp", authController.forgotSendOtp);
  app.post("/api/v1/forgotPassword", authController.forgotPassword);


};