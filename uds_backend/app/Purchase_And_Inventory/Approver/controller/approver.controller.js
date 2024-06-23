const db = require("../../../models/index")
const approverDetails = db.approver;

/////////////// Create Approver ///////////////

exports.create_Approver = async (req, res) => {
    try {
        const {approver_name, level} = req.body;
        const response = await approverDetails.create({
            approver_name, level
        });
        return res.status(200).send({ code: 200, message: "Approver Created Successfully!", data: response })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" })
    };
};

/////////////// Edit Approver ///////////////

exports.edit_Approver= async (req, res) => {
    try {
        const approverId = req.params.id;
        const { approver_name, level } = req.body;
   
        const editData = await approverDetails.findOne({ where: { approver_id: approverId } });
        if (editData) {
            const updateData = await approverDetails.update(
                {
                    approver_name, 
                    level
                },
                { where: { approver_id: approverId } }
            );
            return res.status(200).send({ code: 200, message: "Asset Management Updated Successfull!", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Approver ///////////////

exports.get_ById_Approver = async (req, res) => {
    try {
        const approverId = req.params.id;
        const getData = await approverDetails.findOne({ where: {approver_id: approverId  }, 
        });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Approver data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Approver ///////////////

exports.get_All_Approver= async (req, res) => {
    try {
        const getData = await approverDetails.findAll({ where: { status: "Approved" }});
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All Approver Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Approver ///////////////

exports.delete_Approver = async (req, res) => {
    try {
        const approverId = req.params.id;
        const deleteData = await approverDetails.findOne({ where: { approver_id: approverId } });
        if (deleteData) {
            const dltData = await approverDetails.update({ status: "Pending" }, { where: { approver_id: approverId } });
            return res.status(200).send({ code: 200, message: "Approver Data is Deleted Successfully!", data: dltData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};