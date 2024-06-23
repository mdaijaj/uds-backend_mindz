const db = require("../models/index");
const salaryDetails= db.salaryDetails;



const Op = db.Sequelize.Op;


exports.createSalaryDetails= async (req, res)=>{
    const {tatal_ctc, fixed_ctc, variable_ctc,status}= req.body;
    try{
   
      const regionData= await salaryDetails.create({
        tatal_ctc,
        fixed_ctc,
        variable_ctc
      })
     
      return res.status(200).send({
        message: "create successfully!", data: regionData
      })
    }
    catch(err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    }
}


exports.salaryDetailsList= async (req,res)=>{
  try{
    const data= await salaryDetails.findAll({
    
    })
    
    return res.status(200).send({
        message: "salary details!",data
      })
  }catch(err){
    console.log(err.message)
    res.status(400).send({message: "error", error: err.message})
  }
}


exports.salaryDetailsListById= async (req, res)=>{
  const id= req.params.id
  try{
    const data= await salaryDetails.findAll({ 
      where: {id:id}
    })
   
    res.status(200).send({message:"salarydetails",data})
  }catch(err){
    res.status(400).send({message: "error", error: err.message})
  }
}


exports.salaryDeatilsUpdate= async (req, res)=>{
  const id= req.params.id
  const salaryDetails=req.body.regionDetails;
  try{
    const Data= await salaryDetails.findOne({where:  {id:id}})
    if(salaryDetails){
      const Data= await salaryDetails.update(req.body, {
        where: {id:req.params.id}
      })
      return res.status(200).send({message: "salary updated successfully.", data:Data})
    }
    else{
      return res.status(500).send({message: "Invalid Region Id..."})
    }
  }catch(err){
    res.status(400).send({message: "error", error: err.message})
  }
}


