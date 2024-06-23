const db = require("../../../../models/index");
const Program_Estimate = db.Program_Estimate;


exports.create_Program_Estimate = async (req, res) => {

    try {
        const { open_house_training_id, Trainer_Cost, travel_Cost, trainer_Stay_Charges, trainer_Local_Travel, BDE_Local_Travel, hall_Charges, projector_Charges, participant_Kit, total_Cost, type_of_bill } = req.body;
        const allData = await Program_Estimate.findOne({
            where: {
                open_house_training_id: req.body.open_house_training_id
            }
        })

        if (allData) {
            return res.status(400).send({ code: 200, message: "Program_Estimate Data  already Exist", data: null });
        }
        else {

            const response = await Program_Estimate.create({
                open_house_training_id,
                Trainer_Cost,
                travel_Cost,
                trainer_Stay_Charges,
                trainer_Local_Travel,
                BDE_Local_Travel,
                hall_Charges,
                projector_Charges,
                participant_Kit,
                total_Cost,
                type_of_bill
            });
            return res.status(200).send({ code: 200, message: "Program_Estimate data Successfully", data: response });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit l1 Review ///////////////

exports.edit_Program_Estimate = async (req, res) => {
    try {
        const Program_Estimate_id = req.params.Program_Estimate_id;
        const {
            ABTrainer_Cost,
            ABtravel_Cost,
            ABtrainer_Stay_Charges,
            ABtrainer_Local_Travel,
            ABBDE_Local_Travel,
            ABhall_Charges,
            ABprojector_Charges,
            ABparticipant_Kit,
            ABtotal_Cost } = req.body;
        const editData = await Program_Estimate.findOne({ where: { Program_Estimate_id: Program_Estimate_id } });
        if (editData) {
            const updateData = await Program_Estimate.update({
                ABTrainer_Cost,
                ABtravel_Cost,
                ABtrainer_Stay_Charges,
                ABtrainer_Local_Travel,
                ABBDE_Local_Travel,
                ABhall_Charges,
                ABprojector_Charges,
                ABparticipant_Kit,
                ABtotal_Cost
            }, { where: { Program_Estimate_id: Program_Estimate_id } });
            return res.status(200).send({ code: 200, message: "Program_Estimate data Successfully", data: updateData });
        } else {
            return res.status(400).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.edit_update_overshot = async (req, res) => {
    try {
        const Program_Estimate_id = req.params.Program_Estimate_id;
        const {
            SOTrainer_Cost,
            SOtravel_Cost,
            SOtrainer_Stay_Charges,
            SOtrainer_Local_Travel,
            SOBDE_Local_Travel,
            SOhall_Charges,
            SOprojector_Charges,
            SOparticipant_Kit,
            SOtotal_Cost } = req.body;
        const editData = await Program_Estimate.findOne({ where: { Program_Estimate_id: Program_Estimate_id } });
        if (editData) {
            const updateData = await Program_Estimate.update({
                SOTrainer_Cost,
                SOtravel_Cost,
                SOtrainer_Stay_Charges,
                SOtrainer_Local_Travel,
                SOBDE_Local_Travel,
                SOhall_Charges,
                SOprojector_Charges,
                SOparticipant_Kit,
                SOtotal_Cost
            }, { where: { Program_Estimate_id: Program_Estimate_id } });
            return res.status(200).send({ code: 200, message: "Program_Estimate data Successfully", data: updateData });
        } else {
            return res.status(400).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.update_assimption = async (req, res) => {
    try {
        const Program_Estimate_id = req.params.Program_Estimate_id;
        const {
            AssTrainer_Fee,
            AssProjector_Cost,
            AssTrainerStay,
            AssPrice_Kit,
            AssAdditional_Hallcharges,
            AssHall_charges,
        } = req.body;
        const editData = await Program_Estimate.findOne({ where: { Program_Estimate_id: Program_Estimate_id } });
        if (editData) {
            const updateData = await Program_Estimate.update({
                AssTrainer_Fee,
                AssProjector_Cost,
                AssTrainerStay,
                AssPrice_Kit,
                AssAdditional_Hallcharges,
                AssHall_charges,
            }, { where: { Program_Estimate_id: Program_Estimate_id } });
            return res.status(200).send({ code: 200, message: "Program_Estimate data Successfully", data: updateData });
        } else {
            return res.status(400).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};




/////////////// Get ById l1 Review ///////////////

exports.getById_Program_Estimate = async (req, res) => {
    try {
        const Program_Estimate_id = req.params.Program_Estimate_id;
        const getData = await Program_Estimate.findOne({ where: { Program_Estimate_id: Program_Estimate_id } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Program_Estimate data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getby_open_house_training_id = async (req, res) => {
    try {
        const open_house_training_id = req.params.open_house_training_id;
        const getData = await Program_Estimate.findOne({ where: { open_house_training_id: open_house_training_id } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Program_Estimate data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// GetAll l1 Review///////////////

exports.getAll__Program_Estimate = async (req, res) => {
    try {
        const getAllData = await Program_Estimate.findAll({ where: { status: "ACTIVE" } })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch Program_Estimate Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete l1 Review ///////////////

exports.delete_Program_Estimate = async (req, res) => {
    try {
        const Program_Estimate_id = req.params.Program_Estimate_id;
        const deleteData = await Program_Estimate.findOne({ where: { Program_Estimate_id: Program_Estimate_id } });
        if (deleteData) {
            const dltData = await Program_Estimate.update({ status: "INACTIVE" }, { where: { Program_Estimate_id: Program_Estimate_id } });
            return res.status(200).send({ code: 200, message: " Updated Data is Deleted Successfully!", data: dltData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};