const db = require("../../../models/index")
const amc_description_model = db.description_model

exports.create_description = async (req, res) => {
    try {
        const amc_description = req.body.amc_description;
        const amcDescriptiondata = await amc_description_model.findOne({ where: { amc_description: amc_description, isDeleted:false } });
        if (amcDescriptiondata) {
            return res.status(201).send({ code: 201, message: "AMC Description Name is Already Exits!" });
        }
        const amc_decription_data = await amc_description_model.create({ amc_description })
        return res.status(200).send({ code: 200, message: "description Created", data: amc_decription_data })
    }
    catch (error) {
        console.error(error)
        return res.status(500).send({ code: 500, message: "Internal Server Error" })
    }
}

exports.get_by_id_amc_description = async (req, res) => {
    try {
        const amc_description_id = req.params.id
        const amc_description_data = await amc_description_model.findOne({ where: { amc_description_id: amc_description_id } })
        if (amc_description_data) {
            return res.status(200).send({ code: 200, message: "Description Found", data: amc_description_data })
        }
        else {
            return res.status(404).send({ code: 404, message: "No description found" })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Internal Server Error" })
    }
}

exports.get_all_amc_descriptions = async (req, res) => {
    try {
        const amc_description_data = await amc_description_model.findAll({ where: { isDeleted: false } })
        return res.status(200).send({ code: 200, message: "Description found", data: amc_description_data })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ code: 500, message: "Internal Server Error" })
    }
}

exports.update_amc_description = async (req, res) => {
    try {
        const amc_description_id = req.params.id
        const { amc_description, status } = req.body
        const amc_description_data = await amc_description_model.findOne({ where: { amc_description_id: amc_description_id } })
        if (amc_description_data) {
            const amcDescriptione = await amc_description_model.findAll({ where: { amc_description: amc_description } });
            if (amcDescriptione[0]) {
                return res.status(409).send({ code: 409, message: "AMC Description Name is Already Exits!" });
            } else {
                await amc_description_model.update({ amc_description, status }, { where: { amc_description_id: amc_description_id } })
                return res.status(200).send({ code: 200, message: "amc_description_updated" })
            }
        }
        else {
            return res.status(404).send({ code: 404, message: "No description Found" })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Internal Server" })
    }
}

exports.update_amcdescriptionStatus = async (req, res) => {
    try {
        const amc_description_id = req.params.id;
        const { status } = req.body;
        const editData = await amc_description_model.findOne({ where: { amc_description_id: amc_description_id } });
        if (editData) {
            const updateData = await amc_description_model.update(
                {
                    status
                }, { where: { amc_description_id: amc_description_id } }
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

exports.delete_amc_description = async (req, res) => {
    try {
        const amc_description_id = req.params.id
        const amc_description_data = await amc_description_model.findOne({ where: { amc_description_id: amc_description_id } })
        if (amc_description_data) {
             await amc_description_model.update({ isDeleted: true }, { where: { amc_description_id: amc_description_id } })
            return res.status(200).send({ code: 200, message: "Data is Deleted Successfully!" })
        }
        else {
            return res.status(404).send({ code: 404, message: "No description Found" })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Internal Server" })
    }
}

