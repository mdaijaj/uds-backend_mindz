const db = require("../../../../models/index");
const stageDetails = db.stage;
const op = db.sequelize.op;

exports.createStage = async (req, res) => {
    try {
        const { stage_name } = req.body;
        const stageData = await stageDetails.findOne({ where: { stage_name: stage_name } });   
        if (stageData) {
            return res.status(403).send({ code: 403, message: "Stage Name is Already Exits!" });
        }            
        const response = await stageDetails.create({
                stage_name
            });
            return res.status(200).send({ code: 200, message: "Created Successfully", data: response })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getAllStage = async (req, res) => {
    try {
        const getAllData = await stageDetails.findAll({
            where: { status: "ACTIVE" },
        })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// GetById Stage ///////////////

exports.getByIdStage = async (req, res) => {
    try {
        const StageId = parseInt(req.params.stage_id);
        const getData = await stageDetails.findOne({ where: { stage_id: StageId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data by ID Successfully", data: getData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Stage ///////////////

exports.deleteStage = async (req, res) => {
    try {
        const StageId = parseInt(req.params.stage_id);
        const dltStage = await stageDetails.findOne({ where: { stage_id: StageId } });
        if (dltStage) {
            const deleteData = await stageDetails.update({ status: "INACTIVE" }, { where: { stage_id: StageId } });
            return res.status(200).send({ code: 200, message: "Stage Data is Deleted Successfully!", data: deleteData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};