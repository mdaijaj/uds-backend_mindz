const db = require("../../../models/index");
const rental_aggrementDetails = db.Rental_Aggrement;
const RentalDocoments = db.Rental_documentDoc;
// const baseUrl = "https://emerp.elitetraveltech.in/";
const baseUrl = "https://emerp.elitetraveltech.in/";
/////////////// Create Rental_Aggrement///////////////

exports.create_Rental_Aggrement = async (req, res) => {
    try {
        const { name_of_the_Agreement, request_initiated_date, vendor_name, tenant_name, description_of_amc,
            agreement_from_date, agreement_to_date, no_of_years, increment_yearly, amount, tax, total_amount,
            first_reminder, second_reminder, third_reminder, rental_status, termination_date, location } = req.body;
        if (req.file) {
            var terminateCopyUpload = req.file.path
        } else {
            var terminateCopyUpload = ""
        }
        const response = await rental_aggrementDetails.create({
            name_of_the_Agreement,
            request_initiated_date,
            vendor_name,
            tenant_name,
            description_of_amc,
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
            location,
            rental_status,
            termination_date,
            terminate_copy_upload: baseUrl + terminateCopyUpload,
        });
        return res.status(200).send({ code: 200, message: "Rental Agreement Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Update Rental_Aggrement///////////////

exports.update_Rental_Aggrement = async (req, res) => {
    try {
        const rental_docId = req.params.id;
        const uploadAgreementCopy = req.file.path == undefined ? " " : req.file.path;
        const findOthers = await rental_aggrementDetails.findOne({ where: { rental_aggrement_id: rental_docId } });
        if (findOthers) {
            const create_other_doc = await RentalDocoments.create({
                rental_aggrement_id: rental_docId,
                file_name: req.body.file_name,
                upload_agreement_copy: baseUrl + uploadAgreementCopy,
            });
            return res.status(200).send({ code: 200, message: "Created Rental_Aggrement Successfully", data: create_other_doc });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Edit Rental_Aggrement///////////////

exports.edit_Rental_Aggrement = async (req, res) => {
    try {
        const rental_aggrementId = req.params.id;
        const { name_of_agreement, request_initiated_date, vendor_name, company_name, description_of_amc,
            agreement_from_date, agreement_to_date, no_of_years, increment_yearly, amount, tax, total_amount,
            first_reminder, second_reminder, third_reminder, ams_status, terminate_date, location } = req.body;

        var upload_agreement_copy = req.files.upload_agreement_copy == undefined ? "" : upload_agreement_copy = req.files.upload_agreement_copy[0].path;
        var terminate_copy_upload = req.files.terminate_copy_upload == undefined ? "" : terminate_copy_upload = req.files.terminate_copy_upload[0].path;
        const editData = await rental_aggrementDetails.findOne({ where: { rental_aggrement_id: rental_aggrementId } });
        if (editData) {
            const updateData = await rental_aggrementDetails.update(
                {
                    name_of_agreement,
                    request_initiated_date,
                    vendor_name,
                    company_name,
                    description_of_amc,
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
                    location,
                    upload_agreement_copy: baseUrl + upload_agreement_copy,
                    ams_status,
                    terminate_date,
                    terminate_copy_upload: baseUrl + terminate_copy_upload,
                },
                { where: { rental_aggrement_id: rental_aggrementId } }
            );
            return res.status(200).send({ code: 200, message: "Rental_Aggrement Updated Successfull!", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Rental Agreement ///////////////

exports.get_ById_Rental_Aggrement = async (req, res) => {
    try {
        const rental_aggrementId = req.params.id;
        const getData = await rental_aggrementDetails.findOne({
            where: { rental_aggrement_id: rental_aggrementId },
            include: [{
                model: RentalDocoments,
                attributes: ["file_name", "upload_agreement_copy"]
            }]
        });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Rental Agreement data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Rental_Agreement///////////////

exports.get_All_Rental_Aggrement = async (req, res) => {
    try {
        const getData = await rental_aggrementDetails.findAll({
            where: { status: "ACTIVE" },
            include: [{
                model: RentalDocoments,
                attributes: ["file_name", "upload_agreement_copy"]
            }]
        });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All Rental Agreement Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete AMC_Agreement ///////////////

exports.delete_Rental_Aggrement = async (req, res) => {
    try {
        const rental_aggrementId = req.params.id;
        const deleteData = await rental_aggrementDetails.findOne({ where: { rental_aggrement_id: rental_aggrementId } });
        if (deleteData) {
            const dltData = await rental_aggrementDetails.update({ status: "INACTIVE" }, { where: { rental_aggrement_id: rental_aggrementId } });
            return res.status(200).send({ code: 200, message: "Rental Agreement is Deleted Successfully!", data: dltData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};