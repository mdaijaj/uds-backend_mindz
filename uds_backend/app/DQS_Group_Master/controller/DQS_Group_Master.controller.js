const db = require('../../models/index');
const dqsGroupMaster = db.dqsgroupMaster;


// /////////////// Create DQS Group Master //////////////
exports.create_dqsGroup_Master = async (req, res) => {
    try {
        const { group_name, emails } = req.body;
            const response = await dqsGroupMaster.create({
             group_name,
             emails
            });
            return res.status(200).send({ code: 200, message: "DQS Group Master Created Successfully!", data: response });
    
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/ /////////////// Get All DQS Group Master///////////////

exports.getAll_dqsGroup_Master = async (req, res) => {
    try {
        const getAllData = await dqsGroupMaster.findAll({ where: { status: "ACTIVE" }})
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All DQS Group Master Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


// /////////////// Edit DQS Group Master ///////////////

exports.edit_dqsGroup_Master = async (req, res) => {
    try {
        const dqsgroupId = req.params.id;
        const editData = await dqsGroupMaster.findOne({ where: { dqs_group_id: dqsgroupId } });
        if (editData) {
            const updateData = await dqsGroupMaster.update(req.body, { where: { dqs_group_id: dqsgroupId } });
            return res.status(200).send({ code: 200, message: "DQS Group Master Updated SuccessFully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

// // /////////////// Get By Id DQS Group Master  ///////////////

exports.getById_dqsGroup_Master = async (req, res) => {
    try {
        const dqsgroupId = parseInt(req.params.dqs_group_id);
        const getData = await dqsGroupMaster.findOne({ where: { dqs_group_id: dqsgroupId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch DQS Group Master ById Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


// // /////////////// Delete DQS Group Master  ///////////////

exports.delete_dqsGroup_Master = async (req, res) => {
    try {
        const dqsgroupId = req.params.id;
        const getData = await dqsGroupMaster.findOne({ where: { dqs_group_id: dqsgroupId } });
        if (getData) {
            const updated = await dqsGroupMaster.update({ status: "INACTIVE" }, { where: { dqs_group_id: dqsgroupId  } });
            return res.status(200).send({ code: 200, message: " DQS Group Master Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 403, message: "Record Note Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};



