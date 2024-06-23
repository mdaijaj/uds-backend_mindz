const db = require("../../../models/index");
const auditor_invoice_Details = db.auditor_invoice;

/////////////////////// get auditor invoice data /////////////////////////
exports.get_auditor_invoice = async (req, res) => {
    try {
        const getData = await auditor_invoice_Details.findAll();
        if (getData) {
            return res.status(200).send({ code: 200, message: "GET Successfully!", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" }); s
    }
};

/////////////////////// get by id auditor invoice data /////////////////////////
exports.getByID_auditor_invoice = async (req, res) => {
    try {
        const expense_invoice_id = req.params.id;
        const getData = await auditor_invoice_Details.findAll({where: {expense_invoice_id: expense_invoice_id}});
        if (getData) {
            return res.status(200).send({ code: 200, message: "GET Successfully!", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" }); s
    }
};