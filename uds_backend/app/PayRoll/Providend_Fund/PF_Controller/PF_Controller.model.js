const db = require("../../../models/index")
const Providend_Fund=db.PF_Data

///////////////////////Create PF //////////////////////////////////////
exports.Create_PF=async(req,res)=>{
    try{
        const {
            Emp_type,
            Condition,
            Formula,
            start_Date,
            End_Date,
            status
        }=req.body

            const Create_PF_Data=await Providend_Fund.create({
                Emp_type,
                Condition,
                Formula,
                start_Date,
                End_Date,
                status
            })
                res.status(200).send({code :200, message : "PF successfully",dataL:Create_PF_Data})
    }
    catch(error){
        console.log(error)
    res.status(500).send({code : 500, message : "server error"})
    }
}


/////////////////////////////Get PF By Id////////////////////////////////////////////////
exports.Get_PF_Id=async(req,res)=>{
    try{
        const PF_id=req.body.params;
        const Get_Pf_Info_Id=await Providend_Fund.findOne({PF_id: PF_id})
        if(Get_Pf_Info_Id){
            res.status(200).send({code : 200,message:"Data Found",data:Get_Pf_Info_Id})
        }
        else{
            res.status(404).send({code : 404,message:"No Data Found"})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({code : 500,message:"Server error"})
    }
}


//////////////////////////////////Get All By Id/////////////////////////////////////
exports.Get_All_PF=async(req,res)=>{
    try{
        const Get_All_PF=await Providend_Fund.findAll({where:{status:"ACTIVE"}})
        res.status(200).send({code : 200,message:"Data Found",data:Get_All_PF})
    }
    catch(error){
        console.log(error)
        res.status(500).send({code:500,message:"server error"})
    }
}

////////////////////////Update_PF///////////////////////////////////
exports.Update_PF=async(req,res)=>{
   
    try{
        const PF_id=req.params.id
        const{
            Emp_type,
            Condition,
            Formula,
            start_Date,
            End_Date,
            status
        }=req.body;
            
        const PF_Id=await Providend_Fund.findOne({PF_id:PF_id})
        if(PF_Id){
            const Update_PF=await Providend_Fund.update({
                Emp_type:Emp_type,
                Condition:Condition,
                Formula:Formula,
                start_Date:start_Date,
                End_Date:End_Date,
                status:status
        },{where:{PF_id:PF_id}})
        res.status(200).send({code:200,message:"Updated Successfully",code:Update_PF})
    }
        else{
            res.status(404).send({code:404,message:"No Id Found"})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({code:500,message:"Server error"})
    }
}

/////////////////////////Delete_By_Update_Status //////////////////////////
exports.Delete_status = async (req, res) => {
    try{
        const PF_Id=req.params.id
        const Get_PF_Id = await Providend_Fund.findOne({PF_id: PF_Id})
        if(Get_PF_Id){
            const Update_Status=await Providend_Fund.update({status:"INACTIVE"},{where:{PF_id: PF_Id}})
            res.status(200).send({code:200,message:"Deleted Successfully"})
        }
        else{
            res.status(404).send({code:404,message:"No Id Found"})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({code:500,message:"server error"})
    }
}
/////////////////////////Delete_PF /////////////////////////////////
exports.Delete_PF = async (req,res)=>{
    try{
        const PF_Id=req.params.id
    const Find_Id=await Providend_Fund.findOne({PF_id:PF_Id})
    if(Find_Id){
        const Delete_PF=await Providend_Fund.destroy({where:{PF_id:PF_Id}})
        res.status(200).send({code:200,message:"Deleted Successfully"})
    }
    else{
        res.status(404).send({code:404,message:"No Id Found"})
    }
    }
    catch(error){
        console.log(error)
        res.status(500).send({code:500,message:"Server error"})
    }
}