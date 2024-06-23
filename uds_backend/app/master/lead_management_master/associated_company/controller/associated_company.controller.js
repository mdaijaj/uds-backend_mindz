const db = require("../../../../models/index");
const associatedCompanyDetails = db.associated_company;
const op = db.sequelize.op;

// api

exports.createAssociatedCompany = async (req, res) => {
    try {

        const { associated_company_name } = req.body;
        const associatedCompanyData = await associatedCompanyDetails.findOne({ where: { associated_company_name: associated_company_name } });   
        if (associatedCompanyData) {
            return res.status(403).send({ code: 403, message: "Associated Company Name is Already Exits!" });
        } 
        const response = await associatedCompanyDetails.create({
                associated_company_name
            });
            return res.status(200).send({ code: 200, message: "Created Successfully", data: response })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


exports.getAllAssociatedCompany = async (req, res) => {
    try {
        const getAllData = await associatedCompanyDetails.findAll({
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

/////////////// GetById AssociatedCompany ///////////////

exports.getByIdAssociatedCompany = async (req, res) => {
    try {
        const AssociatedCompanyId = parseInt(req.params.associated_company_id);
        const getData = await associatedCompanyDetails.findOne({ where: { associated_company_id: AssociatedCompanyId } });
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

/////////////// Delete AssociatedCompany ///////////////

exports.deleteAssociatedCompany = async (req, res) => {
    try {
        const AssociatedCompanyId = parseInt(req.params.associated_company_id);;
        const dltAssociatedCompany = await associatedCompanyDetails.findOne({ where: { associated_company_id: AssociatedCompanyId } });
        if (dltAssociatedCompany) {
            const deleteData = await associatedCompanyDetails.update({ status: "INACTIVE" }, { where: { associated_company_id: AssociatedCompanyId } });
            return res.status(200).send({ code: 200, message: "Associated Company Data is Deleted Successfully!", data: deleteData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};