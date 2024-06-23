const db = require("../../../models/index");
const courier_containsDetails = db.Courier_Contains;
const Op = db.Sequelize.Op;

/////////////// Create Courier_Contains///////////////

exports.create_Courier_Contains = async (req, res) => {
    try {
        const { courier_contains_name } = req.body;
        const courierContaindata = await courier_containsDetails.findOne({ where: { courier_contains_name: courier_contains_name , isDeleted : false } });
        if (courierContaindata) {
            return res.status(201).send({ code: 201, message: "Courier Contain Name is Already Exits!" });
        }
        const response = await courier_containsDetails.create({
            courier_contains_name
        });
        return res.status(200).send({ code: 200, message: "Courier Contains Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Courier_Contains ///////////////+
exports.edit_Courier_Contains = async (req, res) => {
    try {
        const courierContainId = req.params.id;
        const { courier_contains_name } = req.body;

        const editData = await courier_containsDetails.findOne({ where: { courier_contains_id: courierContainId } });
        if (editData) {
            const courier_contain_namee = await courier_containsDetails.findAll({ where: { courier_contains_name: courier_contains_name } });
            if (courier_contain_namee[0]) {
                return res.status(409).send({ code: 409, message: "Courier Contain Name is Already Exits!" });
            } else {
                const updateData = await courier_containsDetails.update(
                    req.body,
                    { where: { courier_contains_id: courierContainId } }
                );
                return res.status(200).send({ code: 200, message: "Courier ContainsUpdated Successfully!", data: updateData });
            }
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Courier Contain Update Status/////////////
exports.update_courier_contain_status = async (req, res) => {
    try {
        const courierContainId = req.params.id;
        const { status } = req.body;
        const editData = await courier_containsDetails.findOne({ where: { courier_contains_id: courierContainId } });
        if (editData) {
            const updateData = await courier_containsDetails.update(
                {
                    status
                }, { where: { courier_contains_id: courierContainId } }
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

/////////////// Get ById Courier_Contains ///////////////

exports.get_ById_Courier_Contains = async (req, res) => {
    try {
        const courierContainId = req.params.id;
        const getData = await courier_containsDetails.findOne({ where: { courier_contains_id: courierContainId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Courier Contains data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Courier_Contains///////////////

exports.get_All_Courier_Contains = async (req, res) => {
    try {
        const getData = await courier_containsDetails.findAll({
            where: { isDeleted: false }
        });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All Courier Contains Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Courier_Contains ///////////////

exports.delete_Courier_Contains = async (req, res) => {
    try {
        const courierContainId = req.params.id;
        const deleteData = await courier_containsDetails.findOne({ where: { courier_contains_id: courierContainId } });
        if (deleteData) {
            const dltData = await courier_containsDetails.update({ isDeleted: true }, { where: { courier_contains_id: courierContainId } });
            return res.status(200).send({ code: 200, message: "Courier Contains Data is Deleted Successfully!", data: dltData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};