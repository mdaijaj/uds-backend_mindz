const itTicketingController = require("../controller/IT_ticketingController");
const { upload } = require("../../middleware/It_ticket_pdf")

module.exports = app => {
    app.post("/api/v1/create_itTicketing",  upload.fields([{ name: 'attachment', maxCount: 1 }]), itTicketingController.create_itTicketing);
    app.put("/api/v1/edit_itTicketing/:id", upload.fields([{ name: 'attachment', maxCount: 1 }]), itTicketingController.edit_itTicketing);
    app.get("/api/v1/get_itTicketing", itTicketingController.get_itTicketing);
    app.get("/api/v1/get_NAME_EmpID", itTicketingController.get_NAME_EmpID);
    app.get("/api/v1/getSelectedFields", itTicketingController.getSelectedFields);
    app.get("/api/v1/getByUserId_itTicketing/:id", itTicketingController.getByUserId_itTicketing);
    app.get("/api/v1/getById_itTicketing/:id", itTicketingController.getById_itTicketing);
    app.get("/api/v1/get_Allstatus_itTicketing", itTicketingController.get_Allstatus_itTicketing);
    app.get("/api/v1/get_AllOPEN_itTicketing", itTicketingController.get_AllOPEN_itTicketing);
    app.get("/api/v1/get_AllClose_itTicketing", itTicketingController.get_AllClose_itTicketing);
    app.get("/api/v1/get_All_inPROGRES_itTicketing", itTicketingController.get_All_inPROGRES_itTicketing);
    app.get("/api/v1/get_AllToday_itTicketing", itTicketingController.get_AllToday_itTicketing );
    app.get("/api/v1/getAll_preWeek_itTicketing", itTicketingController.getAll_preWeek_itTicketing );
    app.get("/api/v1/getAll_currentMonth_itTicketing", itTicketingController.getAll_currentMonth_itTicketing );
    app.post("/api/v1/getAll_manualSelect_itTicketing", itTicketingController.getAll_manualSelect_itTicketing );
}