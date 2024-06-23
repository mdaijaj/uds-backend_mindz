const db = require("../models/index");
const SBU= db.sbu;
const Op = db.Sequelize.Op;


exports.createSbu= async (req, res)=>{
    const {name, status}= req.body;
    try{
      if (!name) {
        return res.status(400).send({
          message: "Content can not be empty!"
        });
      }

      //Name Exits
      const userExits= await SBU.findOne({
        where: {name: name}
      })
      if(userExits){
        return res.status(403).send({
          message: "SBU Already Exits!"
        })
      }

      // Save sbuData in the database
      const sbuData= await SBU.create({
        name,
        status
      })
      // console.log(JSON.parse("sbuData", sbuData))
      return res.status(200).send({
        message: "create successfully!", data: sbuData
      })
    }
    catch(err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the sbuData."
      });
    }
}


exports.sbuList= async (req,res)=>{
  try{
    const sbuData= await SBU.findAll({
      where: {status : 'ACTIVE'}
    })
    if(sbuData){
      res.status(200).send({message: "get all sbuData list", data: sbuData})
    }
  }catch(err){
    console.log(err.message)
    res.status(400).send({message: "error", error: err.message})
  }
}


exports.sbuDetails= async (req, res)=>{
  const sbuId= req.params.id
  try{
    const sbuData= await SBU.findAll({ 
      where: {id: sbuId}
    })
    if(sbuData){
      res.status(200).send({message: "SBU details get successfully!", data: sbuData})
    }
  }catch(err){
    res.status(400).send({message: "error", error: err.message})
  }
}


exports.sbuUpdate= async (req, res)=>{
  const sbuId= req.params.id
  try{
    const sbuDetails= await SBU.findOne({where:  {id: sbuId}})
    if(sbuDetails){
      const sbuData= await SBU.update(req.body, {
        where: {id: sbuId}
      })
      return res.status(200).send({message: "SBU updated successfully.", data: sbuData})
    }
    else{
      return res.status(500).send({message: "Invalid Region Id..."})
    }
  }catch(err){
    res.status(400).send({message: "error", error: err.message})
  }
}


exports.sbuDeleted = async (req, res) => {
  const sbuId = req.params.id;
  console.log("sbuId", sbuId)
  try{
    const sbuDetails= await SBU.findOne({where:  {id: sbuId}})
    if(sbuDetails){
      const sbuData= await SBU.update( {status: "INACTIVE" }, { 
        where: { id: sbuId }
      })
      return res.status(200).send({
        message: "SBU is deleted successfully!"
      });
    }else{
      return res.status(500).send({message: "Invalid Region Id..."})
    }
  }
  catch(err){
    return res.status(400).send({
      message: "Could not delete Region with id=" + err.message
    })
  }
}