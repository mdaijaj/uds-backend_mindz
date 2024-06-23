const db = require("../../../models/index");
const secuirtyDetails = db.house_Agreement;
const houseDocoments = db.house_Agreement_doc
// const baseUrl = "https://emerp.elitetraveltech.in/";
const baseUrl = "https://emerp.elitetraveltech.in/";
/////////////// Create Security_Agreement///////////////

exports.create_Security_Agreement = async (req, res) => {
    try {
        const { name_of_agreement, request_initiated_date, vendor_name, company_name, description_of_agreement,
            count_of_employees, agreement_from_date, agreement_to_date, no_of_years, increment_yearly, amount, tax, total_amount,
            first_reminder, second_reminder, third_reminder, hk_status, terminate_date } = req.body;
        if (req.file) {
            var terminateCopyUpload = req.file.path
        } else {
            var terminateCopyUpload = ""
        }
        const response = await secuirtyDetails.create({
            name_of_agreement,
            request_initiated_date,
            vendor_name,
            company_name,
            description_of_agreement,
            count_of_employees,
            agreement_from_date,
            agreement_to_date,
            no_of_years,
            increment_yearly,
            amount,
            tax,
            total_amount,
            first_reminder,
            second_reminder,
            third_reminder,
            hk_status,
            terminate_date,
            terminate_copy_upload: baseUrl + terminateCopyUpload,
        });
        return res.status(200).send({ code: 200, message: "Security Agreement Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


/////////////// Update house_Agreement_doc///////////////

exports.update_house_Agreement_doc = async (req, res) => {
    try {
        const house_docId = req.params.id;
        const uploadAgreementCopy = req.file.path == undefined ? " " : req.file.path;
        const findOthers = await secuirtyDetails.findOne({ where: { security_agreement_id: house_docId } });
        if (findOthers) {
            const create_other_doc = await houseDocoments.create({
                security_agreement_id: house_docId,
                file_name: req.body.file_name,
                upload_agreement_copy: baseUrl + uploadAgreementCopy,
            });
            return res.status(200).send({ code: 200, message: "Created house_doc Successfully", data: create_other_doc });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};




/////////////// Edit Security_Agreement///////////////

exports.edit_Security_Agreement = async (req, res) => {
    try {
        const securityId = req.params.id;
        const { name_of_agreement, request_initiated_date, vendor_name, company_name, description_of_agreement,
            count_of_employees, agreement_from_date, agreement_to_date, no_of_years, increment_yearly, amount, tax, total_amount,
            first_reminder, second_reminder, third_reminder, hk_status, terminate_date } = req.body;
        var upload_agreement_copy = req.files.upload_agreement_copy == undefined ? "" : upload_agreement_copy = req.files.upload_agreement_copy[0].path;
        var terminate_copy_upload = req.files.terminate_copy_upload == undefined ? "" : terminate_copy_upload = req.files.terminate_copy_upload[0].path;

        const editData = await secuirtyDetails.findOne({ where: { security_agreement_id: securityId } });
        if (editData) {
            const updateData = await secuirtyDetails.update({
                name_of_agreement,
                request_initiated_date,
                vendor_name,
                company_name,
                description_of_agreement,
                count_of_employees,
                agreement_from_date,
                agreement_to_date,
                no_of_years,
                increment_yearly,
                amount,
                tax,
                total_amount,
                first_reminder,
                second_reminder,
                third_reminder,
                upload_agreement_copy: baseUrl + upload_agreement_copy,
                hk_status,
                terminate_date,
                terminate_copy_upload: baseUrl + terminate_copy_upload,
            },
                { where: { security_agreement_id: securityId } }
            );
            return res.status(200).send({ code: 200, message: "Security_Agreement Updated Successfull!", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Security_Agreement ///////////////

exports.get_ById_Security_Agreement = async (req, res) => {
    try {
        const securityId = req.params.id;
        const getData = await secuirtyDetails.findOne({
            where: { security_agreement_id: securityId },
            include: [{
                model: houseDocoments,
                attributes: ["file_name", "upload_agreement_copy"]
            }]
        });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Security_Agreement data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Security_Agreement///////////////

exports.get_All_Security_Agreement = async (req, res) => {
    try {
        const getData = await secuirtyDetails.findAll({
            where: { status: "ACTIVE" },
            include: [{
                model: houseDocoments,
                attributes: ["file_name", "upload_agreement_copy"]
            }]
        });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All Security_Agreement Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Security_Agreement ///////////////

exports.delete_Security_Agreement = async (req, res) => {
    try {
        const securityId = req.params.id;
        const deleteData = await secuirtyDetails.findOne({ where: { security_agreement_id: securityId } });
        if (deleteData) {
            const dltData = await secuirtyDetails.update({ status: "INACTIVE" }, { where: { security_agreement_id: securityId } });
            return res.status(200).send({ code: 200, message: "Security Agreement is Deleted Successfully!", data: dltData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};