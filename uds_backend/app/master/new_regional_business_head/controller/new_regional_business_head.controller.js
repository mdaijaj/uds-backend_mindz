const db = require("../../../models/index");

const new_regional_business_headDetails = db.new_regional_business_head
const Op = db.Sequelize.Op;
const new_regionDetails = db.new_region
const User = db.user;
/////////////// Create new_regional_business_head ///////////////

exports.create_new_regional_business_head = async (req, res) => {
    try {
        const { new_region_id,employee_id } = req.body;
        if (new_region_id &&  employee_id){ 
        const response = await new_regional_business_headDetails.create({
            new_region_id,
            employee_id,
            segment_id,
            certificate_type


        });
        return res.status(200).send({ code: 200, message: "new_regional_business_head Created Successfully!", data: response });
    } else {
        return res.status(204).send({code: 204, message: "new_region_id and employee_id is Required!"});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit new_regional_business_head ///////////////

exports.edit_new_regional_business_head = async (req, res) => {
    try {
        const new_regional_business_headId = req.params.id;
        const { new_region_id,employee_id, status, isChecked } = req.body;
        const editData = await new_regional_business_headDetails.findOne({ where: { new_regional_business_head_id: new_regional_business_headId } });
        if (editData) {
            const updateData = await new_regional_business_headDetails.update({
                new_region_id,
                employee_id,
                status,
                isChecked
            },
                { where: { new_regional_business_head_id: new_regional_business_headId } });

            return res.status(200).send({ code: 200, message: "new_regional_business_head Updated SuccessFully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};            

// /////////////// Get ById new_regional_business_head ///////////////

exports.getAll_new_regional_business_head = async (req, res) => {
    try {
        const getAllData = await new_regional_business_headDetails.findAll({ 
            where: {},
            include: [
                {    
                    model: new_regionDetails,
                    attributes: ['new_region_id', 'new_region_name'],
                    where: {},
                },
                {
                  model: User,
                  attributes: ['employee_id', 'first_name'],
                  where: {},
                },
                ]
        });

        if (getAllData) {
            var array = [];
            for (var i = 0; i < getAllData.length; i++) {          
                var new_regionName = getAllData[i].new_region.new_region_name;
                var empName = getAllData[i].registered_user.first_name;
                var obj = {
                    "new_regional_business_head_id": getAllData[i].new_regional_business_head_id,
                    "status": getAllData[i].status,
                    "isChecked":getAllData[i].isChecked,
                    "new_region_id": getAllData[i].new_region_id,
                    'employee_id':getAllData[i].employee_id,
                    "new_region_name": new_regionName,
                    "first_name": empName
                }
                array.push(obj);
            }
            return res.status(200).send({ code: 200, message: "Fetch All new_spa Data Successfully", data: array });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById new_regional_business_head ///////////////

exports.get_ById_new_regional_business_head = async (req, res) => {
    try {
        const new_regional_business_headId = req.params.id;
        const getData = await new_regional_business_headDetails.findOne({
             where: { new_regional_business_head_id: new_regional_business_headId , status: "ACTIVE"},
             include: [
                {    
                    model: new_regionDetails,
                    where: {},
                },
                {
                  model: User,
                  where: {},
                },
                ]
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

/////////////// Delete new_regional_business_head ///////////////

exports.delete_new_regional_business_head = async (req, res) => {
    try {
        const new_regional_business_headId = req.params.id;
        const getData = await new_regional_business_headDetails.findOne({ where: { new_regional_business_head_id: new_regional_business_headId } });
        if (getData) {
            const updated = await new_regional_business_headDetails.update({ status: "INACTIVE" }, { where: { new_regional_business_head_id: new_regional_business_headId } });
            return res.status(200).send({ code: 200, message: "new_regional_business_head Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.get_Bynew_regionId_new_regional_business_head = async (req, res) => {
    try {
        const new_regionId = req.params.id;
        const getAllData = await new_regional_business_headDetails.findAll({
             where: { new_region_id: new_regionId , status: "ACTIVE"},
             include: [
            {
                model: User,
                attributes: ['employee_id', 'first_name'],
                where: {},
            },
            
        ],
         });
         if (getAllData) {
            var array = [];
            for (var i = 0; i < getAllData.length; i++) {          
                var empName = getAllData[i].registered_user.first_name;
                var obj = {
                    "new_regional_business_head_id": getAllData[i].new_regional_business_head_id,
                    "status": getAllData[i].status,
                    "isChecked":getAllData[i].isChecked,
                    "new_region_id": getAllData[i].new_region_id,
                    'employee_id':getAllData[i].employee_id,
                    "first_name": empName
                }
                array.push(obj);
            }
            return res.status(200).send({ code: 200, message: "Fetch by region_id all new_regional_business_head Data Data Successfully", data: array });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};