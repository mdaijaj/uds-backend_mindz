const db = require("../../../models/index");
const insuranceDetails = db.Insurance;
const insuranceDocoments = db.Insurance_doc
// const baseUrl = "https://emerp.elitetraveltech.in/";
const baseUrl = "https://emerp.elitetraveltech.in/";

/////////////// Create Insurance///////////////

exports.create_Insurance = async (req, res) => {
    try {
        const { name_of_the_Agreement, request_initiated_date, vendor_name, policy_holder_name, insurance_company_name,
            third_party_assistant, policy_name, policy_number, count_of_employees_covered, total_sum_assured,
            PTDA_individual, ctc, increment_yearly, company_name, description_of_agreement, count_of_employees,
            policy_from_date, policy_to_date, no_of_years, policy_amount, tax, total_amount, first_reminder, second_reminder, third_reminder,
            policy_status, status_upload_date } = req.body;
        if (req.file) {
            var terminateCopyUpload = req.file.path
        } else {
            var terminateCopyUpload = ""
        }
        const response = await insuranceDetails.create({
            name_of_the_Agreement,
            request_initiated_date,
            vendor_name,
            policy_holder_name,
            insurance_company_name,
            third_party_assistant,
            policy_name,
            policy_number,
            count_of_employees_covered,
            total_sum_assured,
            PTDA_individual,
            ctc,
            increment_yearly,
            no_of_years,
            company_name,
            description_of_agreement,
            count_of_employees,
            policy_from_date,
            policy_to_date,
            policy_amount,
            tax,
            total_amount,
            first_reminder,
            second_reminder,
            third_reminder,
            policy_status,
            status_upload_date,
            terminate_copy_upload: baseUrl + terminateCopyUpload,
        });
        return res.status(200).send({ code: 200, message: "Insurance Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


/////////////// Update Insurance_doc///////////////

exports.update_Insurance_doc = async (req, res) => {
    try {
        const insurance_docId = req.params.id;
        const uploadAgreementCopy = req.file.path == undefined ? " " : req.file.path;
        const findOthers = await insuranceDetails.findOne({ where: { insurance_id: insurance_docId } });
        if (findOthers) {
            const create_other_doc = await insuranceDocoments.create({
                insurance_id: insurance_docId,
                file_name: req.body.file_name,
                upload_agreement_copy: baseUrl + uploadAgreementCopy,
            });
            return res.status(200).send({ code: 200, message: "Created Insurance_doc Successfully", data: create_other_doc });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};


/////////////// Edit Insurance ///////////////

exports.edit_Insurance = async (req, res) => {
    try {
        insuranceId = req.params.id;
        const { name_of_the_Agreement, request_initiated_date, vendor_name, policy_holder_name, insurance_company_name,
            third_party_assistant, policy_name, policy_number, count_of_employees_covered, total_sum_assured,
            PTDA_individual, ctc, increment_yearly, company_name, description_of_agreement, count_of_employees,
            policy_from_date, policy_to_date, no_of_years, policy_amount, tax, total_amount, first_reminder, second_reminder, third_reminder,
            policy_status, status_upload_date } = req.body;
        var upload_agreement_copy = req.files.upload_agreement_copy == undefined ? "" : upload_agreement_copy = req.files.upload_agreement_copy[0].path;
        var terminate_copy_upload = req.files.terminate_copy_upload == undefined ? "" : terminate_copy_upload = req.files.terminate_copy_upload[0].path;
        const editData = await insuranceDetails.findOne({ where: { insurance_id: insuranceId } });
        if (editData) {
            const updateData = await insuranceDetails.update(
                {
                    name_of_the_Agreement,
                    request_initiated_date,
                    vendor_name,
                    policy_holder_name,
                    insurance_company_name,
                    third_party_assistant,
                    policy_name,
                    policy_number,
                    count_of_employees_covered,
                    total_sum_assured,
                    PTDA_individual,
                    ctc,
                    increment_yearly,
                    no_of_years,
                    company_name,
                    description_of_agreement,
                    count_of_employees,
                    policy_from_date,
                    policy_to_date,
                    policy_amount,
                    tax,
                    total_amount,
                    first_reminder,
                    second_reminder,
                    third_reminder,
                    policy_status,
                    status_upload_date,
                    terminate_copy_upload: baseUrl + terminate_copy_upload,
                    upload_agreement_copy: baseUrl + upload_agreement_copy,
                },
                { where: { insurance_id: insuranceId } }
            );
            return res.status(200).send({ code: 200, message: "Insurance Updated Successfull!", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Insurance ///////////////

exports.get_ById_Insurance = async (req, res) => {
    try {
        insuranceId = req.params.id;
        const getData = await insuranceDetails.findOne({
            where: { insurance_id: insuranceId },
            include: [{
                model: insuranceDocoments,
                attributes: ["file_name", "upload_agreement_copy"]
            }]
        });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Insurance data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Insurance///////////////

exports.get_All_Insurance = async (req, res) => {
    try {
        const getData = await insuranceDetails.findAll({
            where: { status: "ACTIVE" },
            include: [{
                model: insuranceDocoments,
                attributes: ["file_name", "upload_agreement_copy"]
            }]
        });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All Insurance Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Insurance///////////////

exports.delete_Insurance = async (req, res) => {
    try {
        insuranceId = req.params.id;
        const deleteData = await insuranceDetails.findOne({ where: { insurance_id: insuranceId } });
        if (deleteData) {
            const dltData = await insuranceDetails.update({ status: "INACTIVE" }, { where: { insurance_id: insuranceId } });
            return res.status(200).send({ code: 200, message: "Insurance Data is Deleted Successfully!", data: dltData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};