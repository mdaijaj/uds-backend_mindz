const db = require("../../../models/index");
const countryssDetails = db.countryss;
const stateDetails = db.states
const op = db.sequelize.op;

exports.createcountry = async (req, res) => {
    try {
        const { countryss_name, country_code } = req.body;
        const countryData = await countryssDetails.findOne({ where: { countryss_name: countryss_name } });
        if (countryData) {
            return res.status(403).send({ code: 403, message: "Country Name is Already Exits!" });
        }
        const response = await countryssDetails.create({
            countryss_name,
            country_code
        });
        return res.status(200).send({ code: 200, message: "Created Successfully", data: response })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// UPDATE country ///////////////

exports.editcountry = async (req, res) => {
    try {
        const countryssId = parseInt(req.params.countryss_id);
        const { countryss_name, status } = req.body;
        const countryssData = await countryssDetails.findOne({ where: { countryss_name: countryssId } });
        if (countryssData) {
            const response = await countryssDetails.update({
                countryss_name,
                status
            }, { where: { countryss_name: countryssId } });
            return res.status(200).send({ code: 200, message: "Country Updated Successfully", data: response })
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.getAllcountry = async (req, res) => {
    try {
        const getAllData = await countryssDetails.findAll({ where: { status: "ACTIVE" } })
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

/////////////// GetById country ///////////////

exports.getByIdcountry = async (req, res) => {
    try {
        const countryId = parseInt(req.params.countryss_id);
        const getData = await countryssDetails.findOne({ where: { countryss_id: countryId, status: "ACTIVE" } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data by ID Successfully", data: getData });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete country ///////////////

exports.deletecountry = async (req, res) => {
    try {
        const countryId = parseInt(req.params.countryss_id);
        const dltcountry = await countryssDetails.findOne({ where: { countryss_id: countryId } });
        if (dltcountry) {
            const deleteData = await countryssDetails.update({ status: "INACTIVE" }, { where: { countryss_id: countryId } });
            return res.status(200).send({ code: 200, message: "Country Data is Deleted Successfully!", data: deleteData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};