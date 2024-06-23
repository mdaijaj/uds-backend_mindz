const db = require("../../../../models/index");

const eaCodeDetails = db.eacode
const Op = db.Sequelize.Op;

/////////////// Create EA CODE ///////////////

exports.create_ea_code = async (req, res) => {
    try {
        const { ea_code_name } = req.body;
        const response = await eaCodeDetails.create({
            ea_code_name
        });
        return res.status(200).send({ code: 200, message: "EA Code Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit EA CODE ///////////////

exports.edit_ea_code = async (req, res) => {
    try {
        const eacodeId = req.params.id;
        const { ea_code_name, status } = req.body;
        const editData = await eaCodeDetails.findOne({ where: { ea_code_id: eacodeId } });
        if (editData) {
            const updateData = await eaCodeDetails.update({
                ea_code_name,
                status
            },
                { where: { ea_code_id: eacodeId } });

            return res.status(200).send({ code: 200, message: "EA Code Updated SuccessFully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};            

// /////////////// Get ById EA Code ///////////////

exports.getAll_ea_code = async (req, res) => {
    try {
        const getAllData = await eaCodeDetails.findAll({ where: { status: "ACTIVE" } })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All EA Code Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById EA Code ///////////////

exports.get_ById_ea_code = async (req, res) => {
    try {
        const eacodeId = req.params.id;
        const getData = await eaCodeDetails.findOne({ where: { ea_code_id: eacodeId } });
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

/////////////// Delete EA Code ///////////////

exports.delete_ea_code = async (req, res) => {
    try {
        const eacodeId = req.params.id;
        const getData = await eaCodeDetails.findOne({ where: { ea_code_id: eacodeId } });
        if (getData) {
            const updated = await eaCodeDetails.update({ status: "INACTIVE" }, { where: { ea_code_id: eacodeId } });
            return res.status(200).send({ code: 200, message: "EA Code Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};