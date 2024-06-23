const db = require("../../../../models/index");
const dqs_PSIDetails = db.dqs_product_sector_industry;
const op = db.sequelize.op;

exports.createDqs_PSI = async (req, res) => {
    try {
        const { dqs_product_sector_industry_name } = req.body;
        const dqs_PSIData = await dqs_PSIDetails.findOne({ where: { dqs_product_sector_industry_name: dqs_product_sector_industry_name } });   
        if (dqs_PSIData) {
            return res.status(403).send({ code: 403, message: "DQS Product Sector / Industry - Name is Already Exits!" });
        }         
        const response = await dqs_PSIDetails.create({
                dqs_product_sector_industry_name
            });
            return res.status(200).send({ code: 200, message: "Created Successfully", data: response })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getAllDqs_PSI = async (req, res) => {
    try {
        const getAllData = await dqs_PSIDetails.findAll({
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

/////////////// GetById Dqs_PSI ///////////////

exports.getByIdDqs_PSI = async (req, res) => {
    try {
        const Dqs_PSIId = parseInt(req.params.dqs_product_sector_industry_id);
        const getData = await dqs_PSIDetails.findOne({ where: { dqs_product_sector_industry_id: Dqs_PSIId } });
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

/////////////// Delete Dqs_PSI ///////////////

exports.deleteDqs_PSI = async (req, res) => {
    try {
        const Dqs_PSIId = parseInt(req.params.dqs_product_sector_industry_id);
        const dltDqs_PSI = await dqs_PSIDetails.findOne({ where: { dqs_product_sector_industry_id: Dqs_PSIId } });
        if (dltDqs_PSI) {
            const deleteData = await dqs_PSIDetails.update({ status: "INACTIVE" }, { where: { dqs_product_sector_industry_id: Dqs_PSIId } });
            return res.status(200).send({ code: 200, message: "DQS Product Sector / Industry Data is Deleted Successfully!", data: deleteData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};