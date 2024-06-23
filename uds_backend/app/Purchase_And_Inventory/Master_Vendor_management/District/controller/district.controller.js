const db = require("../../../../models/index");
const districtDetail = db.districtDetails
const Op = db.Sequelize.Op;

/////////////// Create District ///////////////

exports.create_District = async (req, res) => {
    try {
        const { district_name } = req.body;
        const response = await districtDetail.create({
            district_name
        });
        return res.status(200).send({ code: 200, message: "District Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit District ///////////////

exports.edit_District = async (req, res) => {
    try {
        const districtId = req.params.id;
        const editData = await districtDetail.findOne({ where: { district_id: districtId } });
        if (editData) {
            const updateData = await districtDetail.update(req.body, { where: { district_id: districtId } });
            return res.status(200).send({ code: 200, message: "District Updated SuccessFully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById District ///////////////

exports.get_ById_District = async (req, res) => {
    try {
        const districtId = req.params.id;
        const getData = await districtDetail.findOne({ where: { district_id: districtId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All District ///////////////

exports.get_All_District = async (req, res) => {
    try {
        const getAllData = await districtDetail.findAll({ where: { district_status: "ACTIVE" } })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All District Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete District ///////////////

exports.delete_District = async (req, res) => {
    try {
        const districtId = req.params.id;
        const getData = await districtDetail.findOne({ where: { district_id: districtId } });
        if (getData) {
            const updated = await districtDetail.update({ district_status: "INACTIVE" }, { where: { district_id: districtId } });
            return res.status(200).send({ code: 200, message: "District Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Note Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};