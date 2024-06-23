const db = require("../../../../models/index");
const l1review_Details = db.l1Review;

/////////////// Create l1 Review ///////////////

exports.create_l1Review = async (req, res) => {
    try {
        const { l1_code, discription, code_status, comment, sub_menu } = req.body;
        const response = await l1review_Details.create({
            l1_code,
            discription,
            code_status,
            comment,
            sub_menu
        });
        return res.status(200).send({ code: 200, message: "l1 Review Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit l1 Review ///////////////

exports.edit_l1Review = async (req, res) => {
    try {
        const l1ReviewId = req.params.id;
        const { l1_code, discription, code_status, comment, sub_menu } = req.body;
        const editData = await l1review_Details.findOne({ where: { l1review_id: l1ReviewId } });
        if (editData) {
            const updateData = await l1review_Details.update({
                l1_code,
                discription,
                code_status,
                comment,
                sub_menu
            }, { where: { l1review_id: l1ReviewId } });
            return res.status(200).send({ code: 200, message: "l1 Review Updated Successfull!", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById l1 Review ///////////////

exports.getById_l1Review = async (req, res) => {
    try {
        const l1ReviewId = req.params.id;
        const getData = await l1review_Details.findOne({ where: { l1review_id: l1ReviewId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch l1 Review data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// GetAll l1 Review///////////////

exports.getAll_l1Review = async (req, res) => {
    try {
        const getAllData = await l1review_Details.findAll({ where: { status: "ACTIVE" } })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All l1 Review Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete l1 Review ///////////////

exports.delete_l1Review = async (req, res) => {
    try {
        const l1ReviewId = req.params.id;
        const deleteData = await l1review_Details.findOne({ where: { l1review_id: l1ReviewId } });
        if (deleteData) {
            const dltData = await l1review_Details.update({ status: "INACTIVE" }, { where: { l1review_id: l1ReviewId } });
            return res.status(200).send({ code: 200, message: "l1 Review Data is Deleted Successfully!", data: dltData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};