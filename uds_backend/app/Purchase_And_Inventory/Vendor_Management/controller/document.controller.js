const db = require("../../../models/index");
const dcoumentDetails = db.dcoumentDetail;
const vendorManagementDetails = db.vendorManagement;
const baseUrl = "https://emerp.elitetraveltech.in/";
// const baseUrl = "https://emerp.elitetraveltech.in/";
// const baseUrl = "http://localhost:5000/"
const op = db.Sequelize.Op

/////////////// Create Document Vendor Management ///////////////

exports.create_Document_Vendor_Management = async (req, res) => {
    try {
        const { vendor_management_id, document_name, document_type, expiry_date, remarks } = req.body;
        var upload_document = req.files.upload_document == undefined ? "" : upload_document = req.files.upload_document[0].path;
        if (vendor_management_id) {
            const docData = await vendorManagementDetails.findOne({ where: { vendor_management_id: vendor_management_id } })
            if (docData) {
                const createData = await dcoumentDetails.create({
                    vendor_management_id,
                    document_name, document_type,
                    upload_document: baseUrl + upload_document,
                    expiry_date,
                    remarks
                });
                return res.status(200).send({ code: 200, message: "Document Details Updated Successfully", data: createData });
            } else {
                return res.status(405).send({ code: 405, message: `Vendor Management Id is not available for ${vendor_management_id}` });
            }
        } else {
            return res.status(404).send({ code: 404, message: "Vendor Management Id is Required" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" })
    };
};

/////////////// Edit Document Details Vendor Management ///////////////

exports.edit_Document_Details_Vendor_Management = async (req, res) => {
    try {
        const documentId = req.params.id;
        const { vendor_management_id, document_name, document_type, expiry_date, remarks } = req.body;

        var upload_document = req.files.upload_document == undefined ? "" : upload_document = req.files.upload_document[0].path;
        const editData = await dcoumentDetails.findOne({ where: { document_id: documentId } });
        var uploadDocument = upload_document == '' ? upload_document = editData.upload_document : upload_document = baseUrl + upload_document

        if (editData) {
            const updateData = await dcoumentDetails.update(
                {
                    vendor_management_id,
                    document_name, document_type,
                    upload_document: uploadDocument,
                    expiry_date,
                    remarks
                },
                { where: { document_id: documentId } }
            );
            return res.status(200).send({ code: 200, message: "Document Details Updated Successfully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" })
    };
};

/////////////// Get ById Document Vendor Management ///////////////

exports.get_ById_Document_Vendor_Management = async (req, res) => {
    try {
        const documentId = req.params.id
        const getAllData = await dcoumentDetails.findAll({ where: { document_id: documentId } })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Document Details Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Document Vendor Management ///////////////

exports.get_All_Document_Vendor_Management = async (req, res) => {
    try {
        const getAllData = await dcoumentDetails.findAll({
            where: { status: "ACTIVE" },
            include: [{
                model: vendorManagementDetails,
                attributes: ["vendor_name"]
            }]
        })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Document Details Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Document Vendor Management ///////////////

exports.delete_Document_Vendor_Management = async (req, res) => {
    try {
        const documentId = req.params.id;
        const getData = await dcoumentDetails.findOne({ where: { document_id: documentId } });
        if (getData) {
            const updated = await dcoumentDetails.update({ status: "INACTIVE" }, { where: { document_id: documentId } });
            return res.status(200).send({ code: 200, message: "Bank Details Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Note Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};