const db = require("../models");
const {check} = require('express-validator');
const config = require("../config/auth.config");
const transport = require('../services/nodemailer');
const { where } = require("sequelize");
const { user } = require("../models");

const officeLocation = db.officeLocation;


exports.officeLocationTestdata = async (req, res) => {
  const {work_physical_location_name,status}=req.body;

    if (!req.body.work_physical_location_name) {
      res.status(400).send({
        message: "City work_physical_location_name can not be empty!"
      });
      return;
    }
    let test = await officeLocation.findOne({
      where: {
        work_physical_location_name:work_physical_location_name,
      },
    })
    if(test){
      return res.status(404).send({
             status:"404",
          message: "work_physical_location_name Already exists!",
        });
    }
    
    let data= await officeLocation.create({
      work_physical_location_name:work_physical_location_name,
      status:status

     });

    try {
      res
        .status(200)
        .send({ status: "success", message: "Data Saved",data});
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Data Not Saved" });
    }
  }


  exports.officeLocationTest = async (req, res) => {
    const userDetails = await officeLocation.findAll({ 
      attributes: ['work_physical_location_id','work_physical_location_name','status'],
    })
 if(!userDetails){
    return res.status(200).send({
    status: 404,
    message: 'No data found'
 });
 }
 try {
  res
    .status(200)
    .send({ status: "success", message: "Data find Successfully",userDetails });
} catch (error) {
  console.log(error);
  res.send({ status: "failed", message: "Unable to Register" });
}
}

exports.officeLocationTestById = async (req, res) => {
  const offid= parseInt(req.params.work_physical_location_id);
  const userDetails = await officeLocation.findAll({
    where:{work_physical_location_id:offid}
  })
if(!userDetails){
  return res.status(200).send({
  status: 404,
  message: 'No data found'
});
}
try {
res
  .status(200)
  .send({ status: "success", message: "Data find Successfully",userDetails });
} catch (error) {
console.log(error);
res.send({ status: "failed", message: "Unable to Register" });
}
}



exports.officeLocationTestdataStatus = async (req, res) => {
  const offid= parseInt(req.params.work_physical_location_id);
  
  try{
    const data= await officeLocation.findOne({where:  {work_physical_location_id:offid}})
    if(data){
      const data= await officeLocation.update( {status: "INACTIVE" }, { 
        where: { work_physical_location_id: offid}
      })
      return res.status(200).send({
        message: "data is deleted successfully!"
      });
    }else{
      return res.status(500).send({message: "Invalid id..."})
    }
  }
  catch(err){
    return res.status(400).send({
      message: "Could not delete gradeData with id=" + err.message
    })
  }
}

exports.updateOfficeLocation= async (req, res)=>{
  const offid= parseInt(req.params.work_physical_location_id);
  try{
    const userDetails= await officeLocation.findOne({where:  {work_physical_location_id:offid}})
    if(userDetails){
      const userDetailsData= await officeLocation.update(req.body, {
        where: {work_physical_location_id: offid}
      })
      return res.status(200).send({message: "Data Update Successfully.", data:userDetailsData})
    }
    else{
      return res.status(500).send({message: "Unable to update data"})
    }
  }catch(err){
    res.status(400).send({message: "error", error: err.message})
  }
}

