const db = require("../../models/index");
const multipleSiteDetails = db.multipleSite
const Op = db.Sequelize.Op;

/////////////// Create Multiple Site ///////////////

exports.createMultipleSite = async (req, res) => {
    try {
        const { multiple_site_name } = req.body;
        const response = await multipleSiteDetails.create({
            multiple_site_name
        });
        return res.status(200).send({ code: 200, message: "Multiple Site Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Multiple Site ///////////////

exports.editMultipleSite = async (req, res) => {
    try {
        const multipleSiteId = req.params.id;
        const editData = await multipleSiteDetails.findOne({ where: { multiple_site_id: multipleSiteId } });
        if (editData) {
            const updateData = await multipleSiteDetails.update(req.body, { where: { multiple_site_id: multipleSiteId } });
            return res.status(200).send({ code: 200, message: "Multiple Site Updated SuccessFully", data: updateData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Multiple Site ///////////////

exports.getMultipleSiteById = async (req, res) => {
    try {
        const multipleSiteId = req.params.id;
        const getData = await multipleSiteDetails.findOne({
            where: { multiple_site_id: multipleSiteId, status: "ACTIVE" }
        });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Multiple Site ///////////////

exports.getAllMultipleSite = async (req, res) => {
    try {
        const getAllData = await multipleSiteDetails.findAll({ where: { status: "ACTIVE" }})
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Multiple Site Data Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Multiple Site ///////////////

exports.deleteMultipleSite = async (req, res) => {
    try {
        const multipleSiteId = req.params.id;
        const getData = await multipleSiteDetails.findOne({ where: { multiple_site_id: multipleSiteId } });
        if (getData) {
            const updated = await multipleSiteDetails.update({ status: "INACTIVE" }, { where: { multiple_site_id: multipleSiteId } });
            return res.status(200).send({ code: 200, message: "Multiple Site Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 403, message: "Record Note Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};