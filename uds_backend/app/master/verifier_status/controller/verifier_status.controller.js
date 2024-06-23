const db = require("../../../models/index");

const verifier_statusDetails = db.verifier_status
const Op = db.Sequelize.Op;

/////////////// Create verifier_status ///////////////

exports.create_verifier_status = async (req, res) => {
    try {
        const { verifier_status_name } = req.body;
        const data = await verifier_statusDetails.findOne({where: {verifier_status_name: verifier_status_name}})
        if(data){
            return res.status(400).send({code: 400, message:"verifier_status_name is Already Exits!"})
        } else{
        const response = await verifier_statusDetails.create({
            verifier_status_name,
        
        });
        return res.status(200).send({ code: 200, message: "verifier_status Created Successfully!", data: response });
    }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit verifier_status ///////////////

exports.edit_verifier_status = async (req, res) => {
    try {
        const verifier_statusId = req.params.id;
        const { verifier_status_name, status, isChecked } = req.body;
        const editData = await verifier_statusDetails.findOne({ where: { verifier_status_id: verifier_statusId } });
        if (editData) {
            const updateData = await verifier_statusDetails.update({
                verifier_status_name,
                status,
                isChecked
            },
                { where: { verifier_status_id: verifier_statusId } });

            return res.status(200).send({ code: 200, message: "verifier_status Updated SuccessFully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};            

// /////////////// Get ById verifier_status ///////////////

exports.getAll_verifier_status = async (req, res) => {
    try {
        const getAllData = await verifier_statusDetails.findAll()
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All verifier_status Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById verifier_status ///////////////

exports.get_ById_verifier_status = async (req, res) => {
    try {
        const verifier_statusId = req.params.id;
        const getData = await verifier_statusDetails.findOne({ where: { verifier_status_id: verifier_statusId } });
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

/////////////// Delete verifier_status ///////////////

exports.delete_verifier_status = async (req, res) => {
    try {
        const verifier_statusId = req.params.id;
        const getData = await verifier_statusDetails.findOne({ where: { verifier_status_id: verifier_statusId } });
        if (getData) {
            const updated = await verifier_statusDetails.update({ status: "INACTIVE" }, { where: { verifier_status_id: verifier_statusId } });
            return res.status(200).send({ code: 200, message: "verifier_status Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};