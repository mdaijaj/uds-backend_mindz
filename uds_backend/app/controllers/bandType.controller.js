const db = require("../models/index");
const bandTypeDetails = db.bandType;

/////////////// Create Band Type ///////////////

exports.createBandType = async (req, res) => {
    try {
        const { band_type_name } = req.body
        const bandData = await bandTypeDetails.findOne({ where: { band_type_name: band_type_name } });
        if (bandData) {
            return res.status(403).send({ code: 403, message: "Band Type band_type_name is Already Exits!" });
        } else {
            const response = await bandTypeDetails.create({
              band_type_name
            });
            return res.status(200).send({ code: 200, message: "Band Type Created Successfully!", data: response })
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Band Type ///////////////

exports.editBandType = async (req, res) => {
    try {
        const bandTypeId = parseInt(req.params.band_type_id);
        const editData = await bandTypeDetails.findOne({ where: { band_type_id: bandTypeId } });
        if (editData) {
            const updateData = await bandTypeDetails.update(req.body, { where: { band_type_id: bandTypeId } });
            return res.status(200).send({ code: 200, message: "Band Type Updated Successfully", data: updateData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Band Type ///////////////

exports.getAllBandtype = async (req, res) => {
    try {
        const getAllData = await bandTypeDetails.findAll({
            attributes: ['band_type_id','band_type_name','status'],
        })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Band Type Data Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Band Type ///////////////

exports.getByIdBandType = async (req, res) => {
    try {
        const bandTypeId = parseInt(req.params.band_type_id);
        const getData = await bandTypeDetails.findOne({ where: { band_type_id: bandTypeId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data Successfully", data: getData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Band Type ///////////////

exports.deleteBandType = async (req, res) => {
    try {
        const bandTypeId = parseInt(req.params.band_type_id);
        const dltbandType = await bandTypeDetails.findOne({ where: { band_type_id: bandTypeId } });
        if (dltbandType) {
            const deleteData = await bandTypeDetails.update({ status: "INACTIVE" }, { where: { band_type_id: bandTypeId } });
            return res.status(200).send({ code: 200, message: "Band Type Data is Deleted Successfully!", data: deleteData });
        } else {
            return res.status(403).send({ code: 403, message: "Recorb Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};