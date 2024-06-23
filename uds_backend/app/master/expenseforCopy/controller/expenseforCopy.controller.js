const db = require("../../../models/index");

const expenseforCopyDetails = db.expenseforCopy
const Op = db.Sequelize.Op;

/////////////// Create expenseforCopy ///////////////

exports.create_expenseforCopy = async (req, res) => {
    try {
        const { expenseforCopy_name } = req.body;
        const data = await expenseforCopyDetails.findOne({ where: { expenseforCopy_name: expenseforCopy_name , isDeleted : false} })
        if (data) {
            return res.status(201).send({ code: 201, message: "expenseforCopy_name is already Exits!" })
        }
        const response = await expenseforCopyDetails.create({
            expenseforCopy_name,
        });
        return res.status(200).send({ code: 200, message: "expenseforCopy Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit expenseforCopy ///////////////

exports.edit_expenseforCopy = async (req, res) => {
    try {

        const expenseforCopyId = req.params.id;
        const { expenseforCopy_name } = req.body;
        const editData = await expenseforCopyDetails.findOne({ where: { expenseforCopy_id: expenseforCopyId } });
        if (editData) {
            const expenseforCopy_namee = await expenseforCopyDetails.findAll({ where: { expenseforCopy_name: expenseforCopy_name } });
            if (expenseforCopy_namee[0]) {
                return res.status(409).send({ code: 409, message: "expenseforCopy_name is already Exits!" });
            } else {
              await expenseforCopyDetails.update(req.body, { where: { expenseforCopy_id: expenseforCopyId } });
                return res.status(200).send({ code: 200, message: "expenseforCopy Updated SuccessFully"});
            }
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        return res.status(500).send({ code: 500, message: error.message });
    };
};

////////////////// Update Status expenseforCopy ///////////
exports.update_expenseforCopyStatus = async (req, res) => {
    try {
        const expenseforCopyId = req.params.id;
        const { status } = req.body;
        const editData = await expenseforCopyDetails.findOne({ where: { expenseforCopy_id: expenseforCopyId } });
        if (editData) {
            const updateData = await expenseforCopyDetails.update(
                {
                    status
                }, { where: { expenseforCopy_id: expenseforCopyId } }
            );
            return res.status(200).send({ code: 200, message: "Status Updated Successfully", data: updateData });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

// /////////////// Get ById expenseforCopy ///////////////

exports.getAll_expenseforCopy = async (req, res) => {
    try {
        const getAllData = await expenseforCopyDetails.findAll({
            where: { isDeleted: false }, order: [['expenseforCopy_id', 'DESC']]
        })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All expenseforCopy Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById expenseforCopy ///////////////

exports.get_ById_expenseforCopy = async (req, res) => {
    try {
        const expenseforCopyId = req.params.id;
        const getData = await expenseforCopyDetails.findOne({ where: { expenseforCopy_id: expenseforCopyId } });
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

/////////////// Delete expenseforCopy ///////////////

exports.delete_expenseforCopy = async (req, res) => {
    try {
        const expenseforCopyId = req.params.id;
        const getData = await expenseforCopyDetails.findOne({ where: { expenseforCopy_id: expenseforCopyId } });
        if (getData) {
            const updated = await expenseforCopyDetails.update({ isDeleted: true }, { where: { expenseforCopy_id: expenseforCopyId } });
            return res.status(200).send({ code: 200, message: "expenseforCopy Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};