const db = require("../models/index");
const StatesMaster= db.statesmaster;
// const Op = db.Sequelize.Op;


// exports.statesMaster= async (req, res)=>{
//     const {name, status}= req.body;
//     try{
//       if (!name) {
//         return res.status(400).send({
//           message: "Content can not be empty!"
//         });
//       }

//       //Name Exits
//       const userExits= await StatesMaster.findOne({
//         where: {name: name}
//       })
//       if(userExits){
//         return res.status(403).send({
//           message: "States Already Exits!"
//         })
//       }

//       // Save statesData in the database
//       const statesData= await StatesMaster.create({
//         name,
//         status
//       })
//       // console.log(JSON.parse("statesData", statesData))
//       return res.status(200).send({
//         message: "create successfully!", data: statesData
//       })
//     }
//     catch(err){
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the statesData."
//       });
//     }
// }


// exports.statesMasterList= async (req,res)=>{
//   try{
//     const stateData= await StatesMaster.findAll({
//       where: {status : 'ACTIVE'}
//     })
//     if(stateData){
//       res.status(200).send({message: "get all stateData list", data: stateData})
//     }
//   }catch(err){
//     console.log(err.message)
//     res.status(400).send({message: "error", error: err.message})
//   }
// }


// exports.statesMasterDetails= async (req, res)=>{
//   const stateId= req.params.id
//   try{
//     const statesData= await StatesMaster.findAll({ 
//       where: {id: stateId}
//     })
//     if(statesData){
//       res.status(200).send({message: "StatesMaster details get successfully!", data: statesData})
//     }
//   }catch(err){
//     res.status(400).send({message: "error", error: err.message})
//   }
// }


// exports.statesMasterUpdate= async (req, res)=>{
//   const stateId= req.params.id
//   try{
//     const statesDetails= await StatesMaster.findOne({where:  {id: stateId}})
//     if(statesDetails){
//       const stateData= await StatesMaster.update(req.body, {
//         where: {id: stateId}
//       })
//       return res.status(200).send({message: "StatesMaster updated successfully.", data: stateData})
//     }
//     else{
//       return res.status(500).send({message: "Invalid Region Id..."})
//     }
//   }catch(err){
//     res.status(400).send({message: "error", error: err.message})
//   }
// }


// exports.statesMasterDeleted = async (req, res) => {
//   const statesId = req.params.id;
//   try{
//     const statesDetails= await StatesMaster.findOne({where:  {id: statesId}})
//     if(statesDetails){
//       const roleData= await StatesMaster.update( {status: "INACTIVE" }, { 
//         where: { id: statesId }
//       })
//       return res.status(200).send({
//         message: "StatesMaster is deleted successfully!"
//       });
//     }else{
//       return res.status(500).send({message: "Invalid statesId..."})
//     }
//   }
//   catch(err){
//     return res.status(400).send({
//       message: "Could not delete roleData with id=" + err.message
//     })
//   }
// }