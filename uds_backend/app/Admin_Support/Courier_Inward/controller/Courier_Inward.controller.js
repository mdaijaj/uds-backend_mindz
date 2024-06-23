const { re, combinations } = require("mathjs");
const db = require("../../../models/index");
const courierInward_Details = db.Courier_Inward;
const transport = require("../../../services/nodemailer");
const userDetails = db.user
const moment =require('moment');
const { STRING } = require("sequelize");
const e = require("cors");

const Op = db.Sequelize.Op;

/////////////// Create Courier_Inward///////////////

exports.create_Courier_Inward = async (req, res) => {
    try {
        const emp_id = req.params.id;
        const Role_Verify = await userDetails.findOne({ where: { employee_id: emp_id } });

        if (Role_Verify.user_role == "Administration") {
            const { addressed_to_whom, department, contact_number, senders_name, email, emp_id, web_site_url,
                senders_address, courier_contain, courier_service_name, consignment_number,
                received_By, received_date, handover_By, handover_date, inward_status, handover_to_whom, remarks } = req.body;
            const response = await courierInward_Details.create({
                addressed_to_whom,
                department,
                contact_number,
                senders_name,
                senders_address,
                courier_contain,
                courier_service_name,
                consignment_number,
                received_By,
                received_date,
                handover_By,
                handover_date,
                inward_status,
                handover_to_whom,
                remarks,
                email,
                emp_id,
                web_site_url
            });

            let info = await transport.mailsend({
                from: process.env.EMAIL_FROM,
                to: email,
                cc: "",
                bcc: "",
                subject: "Courier Created Successfully!!!!!!!!",
                html: `<p><strong>Hi ${senders_name}</strong> <br>Please find your link for Courier Inward <a href = ${web_site_url}?id=${response.Courier_Inward_id} </a>
                Your <strong>Official Email Id is</strong> ${email}</p>`
            });
            return res.status(200).send({ code: 200, message: "Courier Inward Created Successfully!", data: response });
        } else {
            return res.status(404).send({ code: 404, message: "You Are Not Authorised User" });

        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Courier_Inward ///////////////

exports.edit_Courier_Inward = async (req, res) => {
    try {
        const emp_id = req.body.emp_id;
        const Role_Verify = await userDetails.findOne({ where: { employee_id: emp_id } });
        const courierInwardId = req.params.id;

        const { handover_By, handover_date, inward_status, handover_to_whom, remarks } = req.body;
        const editData = await courierInward_Details.findOne({ where: { Courier_Inward_id: courierInwardId } });

        if (Role_Verify.user_role == "Administration") {

            const updateData = await courierInward_Details.update(
                {
                    handover_By,
                    handover_date,
                    inward_status,
                    handover_to_whom,
                    remarks
                },
                { where: { Courier_Inward_id: courierInwardId } }
            );
            return res.status(200).send({ code: 200, message: "Courier Inward Updated Successfull!", data: updateData });

        }
 else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Courier_Inward ///////////////

exports.get_ById_Courier_Inward = async (req, res) => {
    try {
        const courierInwardId = req.params.id;
        const getData = await courierInward_Details.findOne({ where: { Courier_Inward_id: courierInwardId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Courier Inward data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Courier_Inward///////////////

exports.get_All_Courier_Inward = async (req, res) => {
    try {
        const emp_id = req.params.id;
        
        const Role_Verify = await userDetails.findOne({ where: { employee_id: emp_id } });
        
        if (Role_Verify.user_role == "Administration") {
            const getData = await courierInward_Details.findAll({ where: { status: "ACTIVE" } });
            return res.status(200).send({ code: 200, message: "Fetch All Courier Inward Data Successfully", data: getData });
        }
        else {
            return res.status(404).send({ code: 404, message: "You Are Not Authorised User" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Courier_Inward ///////////////

exports.delete_Courier_Inward = async (req, res) => {
    try {
        const courierInwardId = req.params.id;
        const deleteData = await courierInward_Details.findOne({ where: { Courier_Inward_id: courierInwardId } });
        if (deleteData) {
            const dltData = await courierInward_Details.update({ status: "INACTIVE" }, { where: { Courier_Inward_id: courierInwardId } });
            return res.status(200).send({ code: 200, message: "Courier Inward Data is Deleted Successfully!", data: dltData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};
exports.getById_emp = async (req, res) => {
    try {
        const emp_id = req.params.id;
        const getAlldata = await userDetails.findOne({ where: { employee_id: emp_id } });
        const fullName = getAlldata.first_name + " " + getAlldata.last_name;
        const newData = { ...getAlldata.dataValues, fullName };
        return res.status(200).send({ code: 200, message: "Get Successfully", data: newData });

    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

exports.getAll_courier_Data = async (req, res) => {
    try {
        const emp_id = req.params.id;
        const Role_Verify = await userDetails.findOne({ where: { employee_id: emp_id } });

        if (Role_Verify.user_role == "User") {
            const getAlldata = await courierInward_Details.findAll({ where: { emp_id: emp_id } });
            return res.status(200).send({ code: 200, message: "Get Successfully", data: getAlldata });
        } else {
            return res.status(404).send({ code: 404, message: "You Are Not Authorised User" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

exports.courier_Accepted=async(req,res)=>{
        const employee_id=req.params.id;
        const {inward_status,Courier_Inward_id,accept_date}=req.body
    try{
        const Emp_Data=await userDetails.findOne({where:{employee_id:employee_id}})
        const courier_Data=await courierInward_Details.findOne({where:{Courier_Inward_id:Courier_Inward_id}})
        let new_Date= moment(courier_Data.received_date)
        let deadline_Date= moment(req.body.accept_date)
        let differnce =Math.round((deadline_Date - new_Date)/ (1000 * 60 * 60 * 24))
        if(Emp_Data.user_role=="User"){
            if(differnce<6 ){
                const Update_status=await courierInward_Details.update({
                    inward_status:inward_status,
                    accept_reject_date:accept_date
                },{where:{Courier_Inward_id:Courier_Inward_id}})
                return res.status(200).send({code:200,message:"Status Updated",data:Update_status})
            }
           else{
            const Update_status=await courierInward_Details.update({
                inward_status:"Locked"
            },{where:{Courier_Inward_id:Courier_Inward_id}})
            return res.status(403).send({code:403,message:"You Have Exceed the Five days limit"})
           }
        }
        else{
            return  res.status(404).send({code:404,message:"Your Role is not User"})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({code:500,message:"server error"})
    }
}

exports.courier_Rejected=async(req,res)=>{
    const employee_id=req.params.id;
    const {inward_status,Courier_Inward_id,rejected,remark}=req.body
try{
    const Emp_Data=await userDetails.findOne({where:{employee_id:employee_id}})
    const courier_Data=await courierInward_Details.findOne({where:{Courier_Inward_id:Courier_Inward_id}})
    let new_Date= moment(courier_Data.received_date)
    let deadline_Date= moment(req.body.accept_date)
    let differnce =Math.round((deadline_Date - new_Date)/ (1000 * 60 * 60 * 24))
    if(Emp_Data.user_role=="User"){
        if(differnce<6 ){
            const Update_status=await courierInward_Details.update({
                inward_status:inward_status,
                accept_reject_date:rejected,
                remarks:remark
            },{where:{Courier_Inward_id:Courier_Inward_id}})
            return res.status(200).send({code:200,message:"Couruier Has Rejected",data:Update_status})
        }
       else{
        const Update_status=await courierInward_Details.update({
            inward_status:"Locked"
        },{where:{Courier_Inward_id:Courier_Inward_id}})
        return res.status(403).send({code:403,message:"You Have Exceed the Five days limit"})
       }
    }
    else{
        return res.status(404).send({code:404,message:"Your Role is not User"})
    }
}
catch(error){
    console.log(error)
    return res.status(500).send({code:500,message:"server error"})
}
}

exports.courier_Redirected=async(req,res)=>{
    try{
        const employee_id=req.params.id;
        const {inward_status,Courier_Inward_id,redirect_date,redirected_whom,redirected_email,remark,redirect_url}=req.body
        const Emp_Data=await userDetails.findOne({where:{employee_id:employee_id}})
    const courier_Data=await courierInward_Details.findOne({where:{Courier_Inward_id:Courier_Inward_id}})
    let new_Date= moment(courier_Data.received_date)
    let deadline_Date= moment(req.body.accept_date)
    let differnce =Math.round((deadline_Date - new_Date)/ (1000 * 60 * 60 * 24))
    if(Emp_Data.user_role=="User"){
        if(differnce<6 ){
            const Update_status=await courierInward_Details.update({
                inward_status:inward_status,
                accept_reject_date:redirect_date,
                Redirected_to_Whom:redirected_whom,
                Redirected_email:redirected_email,
                remarks:remark
            },{where:{Courier_Inward_id:Courier_Inward_id}})

            let info = await transport.mailsend({
                from: process.env.EMAIL_FROM,
                to: redirected_email ,
                cc: "",
                bcc: "",
                subject: "Courier Redirected ",
                html: `<p><strong>Hi ${redirected_whom}</strong> <br>Your Courier has been redirected  <a href = ${redirect_url}?id=${Courier_Inward_id} </a>
                Your <strong>Official Email Id is</strong> ${courier_Data.email}</p>`
            });
            return res.status(200).send({code:200,message:"Couruier Has Redirected",data:Update_status})
        }
       else{
        const Update_status=await courierInward_Details.update({
            inward_status:"Locked"
        },{where:{Courier_Inward_id:Courier_Inward_id}})
        return res.status(403).send({code:403,message:"You Have Exceed the Five days limit"})
       }
    }
    else{
        return res.status(404).send({code:404,message:"Your Role is not User"})
    }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"server error"})
    }
}

exports.courier_Redirected_Data=async(req, res) => {
    try{
        const Courier_Inward_id=req.params.id
        const Redirect_to_whom=req.params.name
        // const {Courier_Inward_id,Redirect_to_whom}=req.body
        const Redirected_Data=await courierInward_Details.findOne({where:{Courier_Inward_id:Courier_Inward_id}})

        if(Redirected_Data){
            return res.status(200).send({code:200 ,message:"Data Fetched successfully",data:Redirected_Data})
        }
        else{
            return  res.status(404).send({code:404 ,message:"No data Found "})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"server error"})
    }
}

exports.courier_Redirected_status=async(req,res)=>{
    try{
        const {Courier_Inward_id,Redirect_to_whom,accept_reject_date,inward_status}=req.body;
        const Recieve_data=await courierInward_Details.findOne({where:{Courier_Inward_id:Courier_Inward_id,Redirected_to_Whom:Redirect_to_whom}})
        if(Recieve_data){
            const update_recieve_data=await courierInward_Details.update({
                inward_status:inward_status,
                accept_reject_date:accept_reject_date
            },{where:{Courier_Inward_id:Courier_Inward_id,Redirected_to_Whom:Redirect_to_whom}})
            return res.status(200).send({code:200,message:"status updated",data:update_recieve_data})
        }
        else{
            return res.status(200).send({code:200,message:"No Reciver data Found"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"server error"})
    }
}

exports.Inward_employee=async(req,res)=>{
    try{
        const employee_id = req.params.id

        const inward_data=await courierInward_Details.findAll({where:{emp_id:employee_id}})
        if(inward_data){
            return  res.status(200).send({code:200,message:"data fetched successfully",data:inward_data})
        }
        else{
            return res.status(404).send({code:404,message:"No Employee Id Found  "})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Server error"})
    }
}

exports.courier_status_Admin=async(req,res)=>{
    try{
    
        const employee_id = req.params.id
        const {Courier_Inward_id,handover_by,handover_date,remark,inward_status}=req.body;
        const employee_data=await userDetails.findOne({where:{employee_id:employee_id}})
        if(employee_data.user_role=='Administration'){
            const Inward_Data=await courierInward_Details.findOne({where:{Courier_Inward_id:Courier_Inward_id}})
            if(Inward_Data){
                const Update_inward=await courierInward_Details.update({
                    handover_By:handover_by,
                    handover_date:handover_date,
                    inward_status:inward_status,
                    remarks:remark
                },{where:{Courier_Inward_id:Courier_Inward_id}})
                return res.status(200).send({code:200,message:"Courier Delivered",data:Update_inward})
            }
            else{
                return res.status(403).send({code:403,message:"No Inward Courier Data found"})
            }
        }
        else{
            return res.status(404).send({code:404,message:"Your Role is not a Administrator"})
        }
    }
    catch(error){
        console.log(error)
        return  res.status(500).send({code:500,message:"server error"})
    }
}

exports.courier_redirected_Admin_update=async(req,res)=>{
    
try{
    const employee_id=req.params.id;
    const {inward_status,Redirected_email,Courier_Inward_id,accept_date,redirect_url}=req.body
    const Emp_Data=await userDetails.findOne({where:{employee_id:employee_id}})
    const courier_Data=await courierInward_Details.findOne({where:{Courier_Inward_id:Courier_Inward_id}})
    let new_Date= moment(courier_Data.received_date)
    let deadline_Date= moment(req.body.accept_date)
    let differnce =Math.round((deadline_Date - new_Date)/ (1000 * 60 * 60 * 24))
    if(Emp_Data.user_role=="Administration"){
        if(differnce<6 ){
            const Update_status=await courierInward_Details.update({
                inward_status:inward_status,
                accept_reject_date:accept_date
            },{where:{Courier_Inward_id:Courier_Inward_id}})
            res.status(200).send({code:200,message:"Status Updated",data:Update_status})
            
            
            let info = await transport.mailsend({
                from: process.env.EMAIL_FROM,
                to: Redirected_email,
                cc: "",
                bcc: "",
                subject: "Admin Response On courier",
                html: `<p><strong>Hi ${Emp_Data.first_name}</strong> <br>Please find your link for Courier Inward <a href = ${redirect_url}?id=${Courier_Inward_id} </a>
                Your <strong>Official Email Id is</strong> ${Redirected_email}}</p>`
            });
        }
       else{
        const Update_status=await courierInward_Details.update({
            inward_status:"Locked"
        },{where:{Courier_Inward_id:Courier_Inward_id}})
        return res.status(403).send({code:403,message:"You Have Exceed the Five days limit",data:Update_status})
       }
    }
    else{
        return  res.status(404).send({code:404,message:"Your Role is not Aminstrator"})
    }
}
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"server error"})
    }
}

exports.handover_by_admin=async(req,res)=>{
    try{
        const employee_id=req.params.id
        const {Courier_Inward_id,accept_date,handover_By,handover_date,remark,inward_status}=req.body
        const Emp_data=await userDetails.findOne({where:{employee_id:employee_id}}) 
        const Inward_data=await courierInward_Details.findOne({where:{Courier_Inward_id:Courier_Inward_id}})
        if(Emp_data.user_role=='Administration'){
            if(Inward_data){
                const Update_inward=await courierInward_Details.update({
                    accept_reject_date:accept_date,
                    handover_By:handover_By,
                    handover_date:handover_date,
                    remarks:remark,
                    inward_status:inward_status
                },{where:{Courier_Inward_id:Courier_Inward_id}})
                return res.status(200).send({code:200,message:"Courier Handover Sucessfully ",data:Update_inward})
            }
            else{
                return res.status(403).send({code:403,message:"No Inward Data Found"})
            }
        }
        else{
            return res.status(404).send({code:404,message:"User Role is not Admin"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"server error"})
    }
}