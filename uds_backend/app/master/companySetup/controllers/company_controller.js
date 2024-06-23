const db = require("../../../models/index");
// const db.company = db.company;
const baseUrl = "https://localhost:3000/"

//////////////////// create api  ////////////////////////////
exports.create_company = async (req, res) => {
    try {
        const {
            com_name,com_country,com_state,com_city,com_pin,com_cin, com_gst, com_currency,com_website, com_contact_no, com_alt_contact_no, com_mail_id
        } = req.body;
        let com_logo = "";
        if (req.file && req.file) {
            com_logo = baseUrl + req.file.path
        }
        const createData = await db.company.create({ 
            com_name,com_country,com_state,com_city,com_pin,com_cin, com_gst, com_currency,com_website, com_contact_no, com_alt_contact_no, com_mail_id, com_logo:com_logo
        });
        return res.status(200).send({ code: 200, message: "Created Succssesfully", 
        data: createData });
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    }
};

//////////////////////////// update api ////////////////////////
exports.update_company = async (req, res) => {
    try {
        const company_id = req.params.id;
        const { com_name,com_country,com_state,com_city,com_pin,com_cin, com_gst, com_currency,com_website, com_contact_no, com_alt_contact_no, com_mail_id, com_status } = req.body;
        let com_logo = "";
        if (req.file && req.file) {
            com_logo = baseUrl + req.file.path;
        }
        const editData = await db.company.findOne({ where: { com_id: company_id } });
        if (editData) {
            const updateData = await db.company.update({
                com_name,com_country,com_state,com_city,com_pin,com_cin, com_gst, com_currency,com_website, com_contact_no, com_alt_contact_no, com_mail_id, com_logo:com_logo,com_status
            },
            {
                where: { com_id: company_id }
            });
            return res.status(200).send({
                code: 200, message: "Company Details Updated SuccessFully",
                data: updateData
            });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: error.message || "Server Error" });
    };
};

// ////////////////// get all ///////////////////////
exports.getAll_company = async (req, res) => {
    try {
        const getAllData = await db.company.findAll();
        return res.status(200).send({ code: 200, message: "Get All Data Successfully", data: getAllData });
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

// ///////////////////// get by id ////////////////////////////
exports.getBy_id_company = async (req, res) => {
    try {
        const company_id = req.params.id;
        const getData = await db.company.findOne({ where: { com_id: company_id } });

        if (getData) {
            return res.status(200).send({ code: 200, message: "Got Succssesfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }

    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};
