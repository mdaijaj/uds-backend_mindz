const db=require("../../models/index")
const notification_model=db.hrms_notification_data

exports.create_notification=async(req,res)=>{
    try{
        const {notification_message,assigned_hiring_manager_id}=req.body 
        const create_notification=await notification_model.create({notification_message,assigned_hiring_manager_id})
        
        return res.status(200).send({code:200,message:"notification created successfully",data:create_notification})
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"INTERNAL ERROR"})
    }
}


exports.notification_by_id=async(req,res)=>{
    try{
        const assigned_hiring_manager_id=req.params.id
        const notification_data=await  notification_model.findOne({where:{assigned_hiring_manager_id:assigned_hiring_manager_id}})
        if(notification_data){
            return res.status(200).send({code:200,message:"Notification ",data:notification_data})
        }
        else{
            return res.status(404).send({code:404,message:"No notification found"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"inter server error"})
    }
}
exports.Delete_notification=async(req,res)=>{
    try{
        const assigned_hiring_manager_id=req.params.id
        const notification_data=await  notification_model.findOne({where:{assigned_hiring_manager_id:assigned_hiring_manager_id}})
        if(notification_data){
            const delete_notification=await notification_model.destroy({where:{assigned_hiring_manager_id:assigned_hiring_manager_id}})
            return res.status(200).send({code:200,message:" Notification Deleted successfully"})
        }
        else{
            return res.status(404).send({code:404,message:"No notification found"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Inter server error"})
    }
}