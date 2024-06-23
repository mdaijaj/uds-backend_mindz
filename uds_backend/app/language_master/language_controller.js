const { re } = require('mathjs');
const db = require('../models/index');
const language_model = db.Language_Master

exports.create_new_language = async (req, res) => {
    try {
        const language_name = req.body.language_name
        const language_namedata = await language_model.findOne({ where: { language_name: language_name, isDeleted: false } });
        if (language_namedata) {
            return res.status(201).send({ code: 201, message: "Language Name is Already Exits!" });
        }
        const language_data = await language_model.create({ language_name });
        return res.status(200).send({ code: 200, message: "language created successfully", data: language_data })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Internal Server Error" })
    }
}

exports.get_language_byid = async (req, res) => {
    try {
        const language_id = req.params.id
        const language_data = await language_model.findOne({ where: { language_id: language_id } })
        if (language_data) {
            return res.status(200).send({ code: 200, message: "Language Fetched", data: language_data })
        }
        else {
            return res.status(404).send({ code: 404, message: "No data found" })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Internal Server Error" })
    }
}
exports.get_all_languages = async (req, res) => {
    try {
        const language_data = await language_model.findAll({ where: { isDeleted: false } })
        if (language_data) {
            return res.status(200).send({ code: 200, message: "Data fetched successfully", data: language_data })
        }
        else {
            return res.status(404).send({ code: 404, message: "No data found" })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Internal server Error" })
    }
}
exports.update_language = async (req, res) => {
    try {
        const language_id = req.params.id
        const language_name = req.body.language_name
        const language_data = await language_model.findOne({ where: { language_id: language_id } })
        if (language_data) {
            const language_namee = await language_model.findAll({ where: { language_name: language_name } });
            if (language_namee[0]) {
                return res.status(409).send({ code: 409, message: "Language Name is Already Exits!" });
            } else {
                const update_language = await language_model.update({ language_name }, { where: { language_id: language_id } })
                return res.status(200).send({ code: 200, message: "language updated successfully", data: update_language })
            }
        }
        else {
            return res.status(404).send({ code: 404, message: "No language found" })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Internal server error" })
    }
}

exports.update_languageStatus = async (req, res) => {
    try {
        const languageId = req.params.id;
        const { status } = req.body;
        const editData = await language_model.findOne({ where: { language_id: languageId } });
        if (editData) {
            const updateData = await language_model.update(
                {
                    status
                }, { where: { language_id: languageId } }
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

exports.delete_language = async (req, res) => {
    try {
        const language_id = req.params.id
        const language_data = await language_model.findOne({ where: { language_id: language_id } })
        if (language_data) {
             await language_model.update({ isDeleted: true }, { where: { language_id: language_id } })
            return res.status(200).send({ code: 200, message: "Data is deleted successfully" })
        }
        else {
            return res.status(404).send({ code: 404, message: "No language found" })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Internal server error" })
    }
}