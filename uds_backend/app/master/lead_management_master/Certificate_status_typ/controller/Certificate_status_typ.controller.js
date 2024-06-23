const db = require("../../../../models/index");

const certificateStatusDetails = db.certificate_status_type
const Op = db.Sequelize.Op;

/////////////// Create certificate status type///////////////

exports.createCertificateStatus = async (req, res) => {
    try {
        const { certificate_status_name } = req.body;
        const response = await certificateStatusDetails.create({
            certificate_status_name
        });
        return res.status(200).send({ code: 200, message: "Certificate Status Type Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit certificate status type ///////////////

exports.editCertificateStatus = async (req, res) => {
    try {
        const CertificateStatusTypeId = req.params.certificate_status_id;
        const { certificate_status_name, status } = req.body;
        const editData = await certificateStatusDetails.findOne({ where: { certificate_status_id: CertificateStatusTypeId } });
        if (editData) {
            const updateData = await certificateStatusDetails.update({
                certificate_status_name,
                status
            },
                { where: { certificate_status_id: CertificateStatusTypeId } });

            return res.status(200).send({ code: 200, message: "Updated SuccessFully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};            

// /////////////// Get ById certificate status type ///////////////

exports.getAllCertificateStatus = async (req, res) => {
    try {
        const getAllData = await certificateStatusDetails.findAll({ where: { status: "ACTIVE" } })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById certificate status type ///////////////

exports.getByIdCertificateStatus = async (req, res) => {
    try {
        const CertificateStatusTypeId = req.params.certificate_status_id;
        const getData = await certificateStatusDetails.findOne({ where: { certificate_status_id: CertificateStatusTypeId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Get ById Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete certificate status type ///////////////

exports.deleteCertificateStatus = async (req, res) => {
    try {
        const CertificateStatusTypeId = req.params.certificate_status_id;
        const getData = await certificateStatusDetails.findOne({ where: { certificate_status_id: CertificateStatusTypeId } });
        if (getData) {
            const updated = await certificateStatusDetails.update({ status: "INACTIVE" }, { where: { certificate_status_id: CertificateStatusTypeId } });
            return res.status(200).send({ code: 200, message: "certificate status type Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};
