const db = require("../../../models/index");

const directorDetails = db.director
const Op = db.Sequelize.Op;

/////////////// Create director ///////////////

exports.create_director = async (req, res) => {
    try {
        const { director_name } = req.body;
        const data = await directorDetails.findOne({where: {director_name: director_name}})
        if(data){
            return res.status(400).send({code: 400, message:"director_name is Already Exits!"})
        } else{
        const response = await directorDetails.create({
            director_name,
        
        });
        return res.status(200).send({ code: 200, message: "director Created Successfully!", data: response });
    }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit director ///////////////

exports.edit_director = async (req, res) => {
    try {
        const directorId = req.params.id;
        const { director_name, status, isChecked } = req.body;
        const editData = await directorDetails.findOne({ where: { director_id: directorId } });
        if (editData) {
            const updateData = await directorDetails.update({
                director_name,
                status,
                isChecked
            },
                { where: { director_id: directorId } });

            return res.status(200).send({ code: 200, message: "director Updated SuccessFully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};            

// /////////////// Get ById director ///////////////

exports.getAll_director = async (req, res) => {
    try {
        const getAllData = await directorDetails.findAll()
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All director Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById director ///////////////

exports.get_ById_director = async (req, res) => {
    try {
        const directorId = req.params.id;
        const getData = await directorDetails.findOne({ where: { director_id: directorId } });
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

/////////////// Delete director ///////////////

exports.delete_director = async (req, res) => {
    try {
        const directorId = req.params.id;
        const getData = await directorDetails.findOne({ where: { director_id: directorId } });
        if (getData) {
            const updated = await directorDetails.update({ status: "INACTIVE" }, { where: { director_id: directorId } });
            return res.status(200).send({ code: 200, message: "director Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};