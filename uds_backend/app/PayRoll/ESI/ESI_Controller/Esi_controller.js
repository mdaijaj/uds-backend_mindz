const db = require("../../../models/index")
const ESI_Model=db.ESI_Data


///////////////////Create ESI_Model////////////////////////
exports.Create_ESI=async(req,res)=>{
    try{
        const{Emp_type,
            Condition,
            Formula,
            start_Date,
            End_Date,
            status
}=req.body;
        const Create_ESI_data=await ESI_Model.create({
            Emp_type,
            Condition,
            Formula,
            start_Date,
            End_Date,
            status
        })
        res.status(200).send({code:200,message:"ESI Create Succesfully",data:Create_ESI_data})
    }
    catch(error){
        console.log(error)
        res.status(500).send({code:500,message:"server error"})
    }
}

////////////////////Get PF by id////////////////////////////////
exports.Get_ESI_ID=async(req,res)=>{
    try{
        const ESI_id=req.params.id
        const Get_Data_ById=await ESI_Model.findOne({ESI_id:ESI_id})
        if(Get_Data_ById){
            res.status(200).send({code:200,message:"Data found",data:Get_Data_ById})
        }
        else{
            res.status(404).send({code:404,message:"Not Found"})
        }
    }
    catch(error){
        res.status(500).send({code:500,message:"server error"})
    }
}
/////////////////////////Get PF By ALL//////////////////////////////////
exports.Get_All_Esi=async(req,res)=>{
    try{
        const Get_Data_All=await ESI_Model.findAll({where:{status:"ACTIVE"}})
        res.status(200).send({code:200,message:"Data found",data:Get_Data_All})
    }
    catch(error){
        res.status(500).send({code:500,message:"server error"})
    }
}

////////////////////////Update ESI Data////////////////////////////////
exports.Update_ESI_Data = async (req, res) => {
    try {
        const ESI_id = req.params.id;
        const ESI_Id = await ESI_Model.findOne({ where: { ESI_id: ESI_id } });
        if (ESI_Id) {
            const Update_ESi = await ESI_Model.update(req.body, { where: { ESI_id: ESI_id } });
            return res.status(200).send({ code: 200, message: "Data updated", data: Update_ESi });
        } else {
            return res.status(404).send({ code: 404, message: "ESI Id not found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

////////////////////////Delete ESI Data (hardcoded)////////////////////////////////
exports.Delete_ESI_Data=async(req,res)=>{
    try{
        const ESI_id=req.params.id;
        const Find_Data=await ESI_Model.findOne({ESI_id:ESI_id})
        if(Find_Data){
            const Delete_ESi=await ESI_Model.destroy({where:{ESI_id:ESI_id}})
            res.status(200).send({code:200,message:"Data deleted"})
        }
        else{
            res.status(404).send({code:404,message:"No ESI Data Found"})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({code:500,message:"Server error"})
    }
}

//////////////////////////Update status of ESI Data ////////////////////////////////
exports.Update_status=async(req,res)=>{
    try{
        const ESI_id=req.params.id
        const Find_Data=await ESI_Model.findOne({ESI_id:ESI_id})
        if(Find_Data){
            const Update_Status=await ESI_Model.update({status:"INACTIVE"},{where:{ESI_id:ESI_id}})
            res.status(200).send({code:200,message:"Data Deleted successfully"})
        }
        else{
            res.status(404).send({code:404,message:"No ESI Data Found"})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({code:500,message:"Server error"})
    }
}

