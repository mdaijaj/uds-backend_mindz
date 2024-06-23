const db = require("../../../models/index");
const complaintsDetails = db.Complaints_Remote;
const Op = db.Sequelize.Op;
// const baseUrl = "https://emerp.elitetraveltech.in/";
const baseUrl = "https://emerp.elitetraveltech.in/";
const path = require("path");
const readXlsxFile = require("read-excel-file/node");
const excel = require("exceljs");

/////////////// Create Complaints_Remote///////////////

exports.create_Complaints_Remote = async (req, res) => {
    try {
        const {  facility_type, initiated_date, person_name, location, repair, type_of_request, description, 
            agreement_signed_date, closed_date,complaints, complaints_status} = req.body;

        var upload_documents = req.files.upload_documents == undefined ? "" : upload_documents = req.files.upload_documents[0].path;
        var upload_vendor = req.files.upload_vendor == undefined ? "" : upload_vendor = req.files.upload_vendor[0].path;
        var upload_comparative = req.files.upload_comparative == undefined ? "" : upload_comparative = req.files.upload_comparative[0].path;
        var upload_sign = req.files.upload_sign == undefined ? "" : upload_sign = req.files.upload_sign[0].path;

        const response = await complaintsDetails.create({
            facility_type,
            initiated_date,
            person_name,
            location,
            repair,
            type_of_request,
            description,
            upload_documents_copy: baseUrl + upload_documents,
            upload_vendor_copy: baseUrl + upload_vendor,
            upload_comparative_copy: baseUrl + upload_comparative,
            upload_sign_copy: baseUrl + upload_sign,
            agreement_signed_date,
            closed_date,
            complaints,
            complaints_status
        });
        return res.status(200).send({ code: 200, message: "Complaints_Remote Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Complaints_Remote///////////////

exports.edit_Complaints_Remote = async (req, res) => {
    try {
        const complaintsId = req.params.id;
        const {facility_type, initiated_date, person_name, location, repair, type_of_request, description, 
            agreement_signed_date, closed_date, complaints,complaints_status } = req.body;
            var upload_documents = req.files.upload_documents == undefined ? "" : upload_documents = req.files.upload_documents[0].path;
            var upload_vendor = req.files.upload_vendor == undefined ? "" : upload_vendor = req.files.upload_vendor[0].path;
            var upload_comparative = req.files.upload_comparative == undefined ? "" : upload_comparative = req.files.upload_comparative[0].path;
            var upload_sign = req.files.upload_sign == undefined ? "" : upload_sign = req.files.upload_sign[0].path;
            const editData = await complaintsDetails.findOne({ where: {complaints_id: complaintsId   } });
        if (editData) {
            const updateData = await complaintsDetails.update(
                {
                    facility_type,
                    initiated_date,
                    person_name,
                    location,
                    repair,
                    type_of_request,
                    description,
                    upload_documents_copy: baseUrl + upload_documents,
                    upload_vendor_copy: baseUrl + upload_vendor,
                    upload_comparative_copy: baseUrl + upload_comparative,
                    upload_sign_copy: baseUrl + upload_sign,
                    agreement_signed_date,
                    closed_date,
                    complaints,
                    complaints_status,
                 
                },
                { where: {complaints_id: complaintsId  } }
            );
            return res.status(200).send({ code: 200, message: "Complaints_Remote Updated Successfull!", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Complaints_Remote///////////////

exports.get_ById_Complaints_Remote = async (req, res) => {
    try {
        const complaintsId = req.params.id;
        const getData = await complaintsDetails.findOne({ where: {complaints_id: complaintsId  } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Complaints_Remote data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Complaints_Remote///////////////

exports.get_All_Complaints_Remote = async (req, res) => {
    try {
        const getData = await complaintsDetails.findAll({
            where: { status: "ACTIVE" }
        });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All Complaints_Remote Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Complaints_Remote ///////////////

exports.delete_Complaints_Remote = async (req, res) => {
    try {
        const complaintsId = req.params.id;
        const deleteData = await complaintsDetails.findOne({ where: { complaints_id: complaintsId  } });
        if (deleteData) {
            const dltData = await complaintsDetails.update({ status: "INACTIVE" }, { where: {complaints_id: complaintsId } });
            return res.status(200).send({ code: 200, message: "Complaints_Remote is Deleted Successfully!", data: dltData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};