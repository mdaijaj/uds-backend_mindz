const db = require("../../../models/index");
const vendor_invoice_Details = db.vendor_invoice;

/////////////////////// get expense invoice data /////////////////////////
exports.get_vendor_invoice = async (req, res) => {
    try {
        const getData = await vendor_invoice_Details.findAll();
        if (getData) {
            return res.status(200).send({ code: 200, message: "GET Successfully!", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" }); s
    }
};

/////////////////////// get by id expense invoice data /////////////////////////
exports.getByID_vendorexpense_invoice = async (req, res) => {
    try {
        const vendor_invoice_id = req.params.id;
        const getData = await vendor_invoice_Details.findAll({where: {vendor_invoice_id: vendor_invoice_id}});
        if (getData) {
            return res.status(200).send({ code: 200, message: "GET Successfully!", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" }); s
    }
};