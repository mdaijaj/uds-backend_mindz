module.exports = app => {
    const empBankDetail = require("../controllers/empBankDetails.controller");

    app.post("/api/v1/createempbankdetails", empBankDetail.createEmpBankDetail)
    app.put("/api/v1/empbankdetailsupdate/:employee_id", empBankDetail.updateEmpBankDetail)
    app.get("/api/v1/empbankdetailget/:employee_id", empBankDetail.getByIdEmpBankDetail)
}