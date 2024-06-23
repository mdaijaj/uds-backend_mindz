const db = require("../../../models/index");
const Courier_Service_nameDetails = db.Courier_Service_name;
const Op = db.Sequelize.Op;

/////////////// Create Courier_Service_name///////////////

exports.create_Courier_Service_name = async (req, res) => {
    try {
        const { courier_Service_name } = req.body;
        const courierServicedata = await Courier_Service_nameDetails.findOne({ where: { courier_Service_name: courier_Service_name , isDeleted:false } });
        if (courierServicedata) {
            return res.status(201).send({ code: 201, message: "Courier Service Name is Already Exits!" });
        }
        const response = await Courier_Service_nameDetails.create({
            courier_Service_name
        });
        return res.status(200).send({ code: 200, message: "Courier Service Name Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Courier_Service_name ///////////////

exports.edit_Courier_Service_name = async (req, res) => {
    try {
        const Courier_ServiceId = req.params.id;
        const { courier_Service_name } = req.body;
        const editData = await Courier_Service_nameDetails.findOne({ where: { courier_Service_id: Courier_ServiceId } });
        if (editData) {
            const courier_Service_namee = await Courier_Service_nameDetails.findAll({ where: { courier_Service_name: courier_Service_name } });
            if (courier_Service_namee[0]) {
                return res.status(409).send({ code: 409, message: "Courier Service Name is Already Exits!" });
            } else {
                const updateData = await Courier_Service_nameDetails.update(
                    req.body, { where: { courier_Service_id: Courier_ServiceId } }
                );
                return res.status(200).send({ code: 200, message: "Courier Service Name Updated Successfully!", data: updateData });
            }
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Update Courier Service Status ///////////////
exports.update_courierServiceStatus = async (req, res) => {
    try {
        const courierServiceId = req.params.id;
        const { status } = req.body;
        const editData = await Courier_Service_nameDetails.findOne({ where: { courier_Service_id: courierServiceId } });
        if (editData) {
            const updateData = await Courier_Service_nameDetails.update(
                {
                    status
                }, { where: { courier_Service_id: courierServiceId } }
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

/////////////// Get ById Courier_Service_name ///////////////

exports.get_ById_Courier_Service_name = async (req, res) => {
    try {
        const Courier_ServiceId = req.params.id;
        const getData = await Courier_Service_nameDetails.findOne({ where: { courier_Service_id: Courier_ServiceId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Courier Service Name data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Courier_Service_name///////////////

exports.get_All_Courier_Service_name = async (req, res) => {
    try {
        const getData = await Courier_Service_nameDetails.findAll({
            where: { isDeleted: false }, order: [['courier_Service_id', 'DESC']],
        });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All CCourier Service Name Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Courier_Service_name///////////////

exports.delete_Courier_Service_name = async (req, res) => {
    try {
        Courier_ServiceId = req.params.id;
        const deleteData = await Courier_Service_nameDetails.findOne({ where: { Courier_Service_id: Courier_ServiceId } });
        if (deleteData) {
            const dltData = await Courier_Service_nameDetails.update({ isDeleted: true }, { where: { Courier_Service_id: Courier_ServiceId } });
            return res.status(200).send({ code: 200, message: "Courier Service name Data is Deleted Successfully!", data: dltData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};