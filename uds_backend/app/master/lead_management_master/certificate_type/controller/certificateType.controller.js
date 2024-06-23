const db = require("../../../../models/index");
const certificateTypeDetails = db.certificate_type;
const op = db.sequelize.op;

exports.createCertificateType = async (req, res) => {
    try {
        const { certificate_type_name } = req.body;
        const certificateTypeData = await certificateTypeDetails.findOne({ where: { certificate_type_name: certificate_type_name } });   
        if (certificateTypeData) {
            return res.status(403).send({ code: 403, message: "Certificate Type Name is Already Exits!" });
        } 
        const response = await certificateTypeDetails.create({
                certificate_type_name
            });
            return res.status(200).send({ code: 200, message: "Created Successfully", data: response })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


exports.getAllCertificateType = async (req, res) => {
    try {
        const getAllData = await certificateTypeDetails.findAll({
            where: { status: "ACTIVE" },
        })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// GetById CertificateType ///////////////

exports.getByIdCertificateType = async (req, res) => {
    try {
        const CertificateTypeId = parseInt(req.params.certificate_type_id);
        const getData = await certificateTypeDetails.findOne({ where: { certificate_type_id: CertificateTypeId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data by ID Successfully", data: getData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete CertificateType ///////////////

exports.deleteCertificateType = async (req, res) => {
    try {
        const CertificateTypeId = parseInt(req.params.certificate_type_id);
        const dltCertificateType = await certificateTypeDetails.findOne({ where: { certificate_type_id: CertificateTypeId } });
        if (dltCertificateType) {
            const deleteData = await certificateTypeDetails.update({ status: "INACTIVE" }, { where: { certificate_type_id: CertificateTypeId } });
            return res.status(200).send({ code: 200, message: "Certificate Type Data is Deleted Successfully!", data: deleteData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};