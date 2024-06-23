const db = require("../../../models/index");
const expense_master = db.expense_master;
/////////////// Create new_spa ///////////////

exports.create_expense_master = async (req, res) => {
    try {
        const { 
        exp_id,
        module_name,
        assign_master,
        levels,
        status, } = req.body;
        const response = await expense_master.create({
            exp_id,
            module_name,
            assign_master,
            levels,
            status,
        });
        return res.status(200).send({ code: 200, message: "new_spa Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit new_spa ///////////////

exports.update_expense_master = async (req, res) => {
    try {
        const exp_id = req.params.id;
        const { 
            module_name,
            assign_master,
            levels,
            status } = req.body;
        const editData = await expense_master.findOne({ where: { exp_id: exp_id } });
        if (editData) {
            const updateData = await expense_master.update({
                module_name,
                assign_master,
                levels,
                status,
            },
                { where: { exp_id: exp_id } });

            return res.status(200).send({ code: 200, message: "new_spa Updated SuccessFully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};            

// /////////////// Get ById new_spa ///////////////

exports.getAll_expense_master = async (req, res) => {
    try {
        const getAllData = await expense_master.findAll({});

        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All new_spa Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById new_spa ///////////////

exports.get_ById_expense_master = async (req, res) => {
    try {
        const exp_id = req.params.id;
        const getData = await expense_master.findOne({
             where: { exp_id: exp_id , status: "ACTIVE"},
         });
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

/////////////// Delete new_spa ///////////////

exports.delete_expense_master = async (req, res) => {
    try {
        const exp_id = req.params.id;
        const getData = await expense_master.findOne({ where: { exp_id: exp_id } });
        if (getData) {
            const updated = await expense_master.update({ status: "INACTIVE" }, { where: { exp_id: exp_id } });
            return res.status(200).send({ code: 200, message: "new_spa Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};