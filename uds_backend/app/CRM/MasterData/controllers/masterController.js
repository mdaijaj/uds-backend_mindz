const db = require("../../../models/index");

module.exports.getFieldType = async (req, res) =>{
    try{
        const getFieldType= await db.models.fieldType.findAll({attributes:['id','field_type'],
        order: [['id', 'DESC']]})
        if(getFieldType){
            return res.status(200).send({code:200, message:'Success',data:getFieldType})
        }else{
            return res.status(404).send({code: 404,message:'Not Created'})
        }
        } catch (error) {
            return res.status(500).send({ code: 500, message: "Server Error" });
        }
};

module.exports.getCreateModuleData = async (req, res) =>{
    try{
        const getData= await db.models.crmModule.findAll({attributes:['menuLink','menuName'],
        order: [['id', 'DESC']]})
        if(getData){
            return res.status(200).send({code:200, message:'Success',data:getData})
        }else{
            return res.status(404).send({code: 404,message:'Not Created'})
        }
        } catch (error) {
            return res.status(500).send({ code: 500, message: "Server Error" });
        }
};

module.exports.createContractLocation = async (req, res) => {
    try {
      const { id, location } = req.body;
      let obj;
      if (location) {
        let duplicate = await db.models.contractLocation.findOne({ where: { isDeleted: false, location: location } });
        if (duplicate) {
          return res.status(409).send({ code: 409, message: "Location Name is Already Exits!" });
        }
      }
      if (id) {
        obj = await db.models.contractLocation.findOne({ where: { id: id } });
      }
      if (obj) {
        const createdData = await obj.update(req.body);
        return res.status(200).send({ code: 200, message: "Updated Successfully", data: createdData });
      } else {
        const createdData = await db.models.contractLocation.create(req.body);
        return res.status(201).send({ code: 201, message: "Created Successfully", data: createdData });
      }
    } catch (error) {
      return res.status(500).send({ code: 500, message: "Server Error" });
    }
  };
  
  module.exports.getContractLocation = async (req, res) => {
    try {
      const getData = await db.models.contractLocation.findAll({ where: { isDeleted: false } });
      if (getData) {
        return res.status(200).send({ code: 200, message: "Successfully Get", data: getData });
      } else {
        return res.status(400).send({ code: 400, message: "Failed to Create Lead" });
      }
    } catch (error) {
      return res.status(500).send({ code: 500, message: "Server Error" });
    }
  };
  
  exports.deleteContractLocation = async (req, res) => {
    try {
      locationId = req.params.id;
      const deleteData = await db.models.contractLocation.findOne({ where: { id: locationId } });
      if (deleteData) {
        const dltData = await db.models.contractLocation.update({ isDeleted: true }, { where: { id: locationId } });
        return res.status(200).send({ code: 200, message: "Deleted Successfully!", data: dltData });
      } else {
        return res.status(404).send({ code: 404, message: "Record Not Found" });
      }
    } catch (error) {
     
      return res.status(500).send({ code: 500, message: "Server Error" });
    };
  };