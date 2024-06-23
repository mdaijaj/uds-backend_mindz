const db = require("../../../models/index");
const policyDetails = db.Policy;
const Op = db.Sequelize.Op;

/////////////// Create Policy///////////////

exports.create_Policy= async (req, res) => {5
    try {
        const { policy_name} = req.body;
        const response = await policyDetails.create({
            policy_name
        });
        return res.status(200).send({ code: 200, message: "Policy Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Policy ///////////////

exports.edit_Policy = async (req, res) => {
    try {
        policyId = req.params.id;
        const {policy_name} = req.body;
   
        const editData = await policyDetails.findOne({ where: { policy_id: policyId } });
        if (editData) {
            const updateData = await policyDetails.update(
                {
                    policy_name
                },
                { where: { policy_id: policyId } }
            );
            return res.status(200).send({ code: 200, message: "Policy Updated Successfull!", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Policy ///////////////

exports.get_ById_Policy = async (req, res) => {
    try {
        policyId = req.params.id;
        const getData = await policyDetails.findOne({ where: { policy_id: policyId}});
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Policy data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Policy///////////////

exports.get_All_Policy = async (req, res) => {
    try {
        const getData = await policyDetails.findAll({ where: { status: "ACTIVE" } 
    });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All Policy Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Policy///////////////

exports.delete_Policy= async (req, res) => {
    try {
         policyId = req.params.id;
        const deleteData = await policyDetails.findOne({ where: {policy_id: policyId} });
        if (deleteData) {
            const dltData = await policyDetails.update({ status: "INACTIVE" }, { where: { policy_id: policyId} });
            return res.status(200).send({ code: 200, message: "Policy Data is Deleted Successfully!", data: dltData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};