const db = require("../../../../models/index");
const verificationStatusDetails = db.verificationStatusDetail
const Op = db.Sequelize.Op;

/////////////// Create Verification Status ///////////////

exports.create_Verification_Status = async (req, res) => {
    try {
        const { verification_status } = req.body;
        const data = await verificationStatusDetails.findOne({ where: { verification_status: verification_status } })
        if (data) {
            return res.status(400).send({ code: 400, message: "Verification Status Already Exits!" })
        } else {
            const response = await verificationStatusDetails.create({
                verification_status
            });
            return res.status(200).send({ code: 200, message: "Verification Status Created Successfully!", data: response });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// get All Verification Status ///////////////

exports.get_All_Verification_Status = async (req, res) => {
    try {
        const getAllData = await verificationStatusDetails.findAll()
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Verification Status Data Successfully!", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};