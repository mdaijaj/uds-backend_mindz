const db = require("../models/index");
const RoleMaster= db.rolemaster;
const Op = db.Sequelize.Op;


exports.createRoleMaster= async (req, res)=>{
    const {name, status}= req.body;
    try{
      if (!name) {
        return res.status(400).send({
          message: "Content can not be empty!"
        });
      }

      //RoleMaster Exits
      const userExits= await RoleMaster.findOne({
        where: {name: name}
      })
      if(userExits){
        return res.status(403).send({
          message: "Role Master Name Already Exits!"
        })
      }

      // Save roleData in the database
      const roleData= await RoleMaster.create({
        name,
        status
      })
      return res.status(200).send({
        message: "create successfully!", data: roleData
      })
    }
    catch(err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the sbuData."
      });
    }
}


exports.roleMasterList= async (req,res)=>{
  try{
    const roleData= await RoleMaster.findAll({
      where: {status : 'ACTIVE'}
    })
    if(roleData){
      res.status(200).send({message: "get all RoleMaster list", data: roleData})
    }
  }catch(err){
    console.log(err.message)
    res.status(400).send({message: "error", error: err.message})
  }
}


exports.roleMasterDetails= async (req, res)=>{
  const roleId= req.params.id
  try{
    const roleData= await RoleMaster.findAll({ 
      where: {id: roleId}
    })
    if(roleData){
      res.status(200).send({message: "RoleMaster details get successfully!", data: roleData})
    }
  }catch(err){
    res.status(400).send({message: "error", error: err.message})
  }
}


exports.roleMasterUpdate= async (req, res)=>{
  const roleId= req.params.id
  try{
    const roleDetails= await RoleMaster.findOne({where:  {id: roleId}})
    if(roleDetails){
      const roleData= await RoleMaster.update(req.body, {
        where: {id: roleId}
      })
      return res.status(200).send({message: "RoleMaster updated successfully.", data: roleData})
    }
    else{
      return res.status(500).send({message: "Invalid Region Id..."})
    }
  }catch(err){
    res.status(400).send({message: "error", error: err.message})
  }
}


exports.roleMasterDeleted = async (req, res) => {
  const roleId = req.params.id;
  try{
    const roleDetails= await RoleMaster.findOne({where:  {id: roleId}})
    if(roleDetails){
      const roleData= await RoleMaster.update( {status: "INACTIVE" }, { 
        where: { id: roleId }
      })
      return res.status(200).send({
        message: "RoleMaster is deleted successfully!"
      });
    }else{
      return res.status(500).send({message: "Invalid Region Id..."})
    }
  }
  catch(err){
    return res.status(400).send({
      message: "Could not delete roleData with id=" + err.message
    })
  }
}