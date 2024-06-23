const db = require("../../../../models/index");

const approvalDetails= db.approval
const Op = db.Sequelize.Op;

/////////////// Create Approval Name ///////////////

exports.create_approval= async (req, res) => {
    try {
        const { approval_name } = req.body;
        const response = await approvalDetails.create({
            approval_name
        });
        return res.status(200).send({ code: 200, message: "Approval name Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// GetAll Approval Name ///////////////

exports.getAll_approval = async (req, res) => {
    try {
        const getAllData = await approvalDetails.findAll({ where: { status: "ACTIVE" } })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Approval Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};



///get by Id
exports.updateBy_approval = async (req, res) => {
    try {
        const approverId = req.params.approval_id
        const editData = await approvalDetails.findOne({ where: { approval_id: approverId } });
        if (editData) {
            const updateData = await approvalDetails.update(req.body, { where: { approval_id: approverId } });
            return res.status(200).send({ code: 200, message: "Data Approval Successfully", data: updateData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};
exports.getById_approval = async (req, res) => {
    const approverId = req.params.approval_id
    try {
        const getAllData = await approvalDetails.findAll({ where: { approval_id:approverId ,status: "ACTIVE" } })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Approval Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};




