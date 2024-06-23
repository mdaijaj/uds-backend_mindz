const e = require("express");
const db=require("../models/index")
const candidate_Onboarding_data=db.Onboarding_data
const User=db.user 
const Onboarding_document_model=db.Onboarding_document_data
const empDocumentDetail = db.empDocumentDetail;

// const baseUrl = "https://emerp.elitetraveltech.in/";
const baseUrl = "https://emerp.elitetraveltech.in/";

exports.create_new_emp=async(req,res)=>{
    try{
        const file_name=req.file.path === undefined ?" ":req.file.path
        const {prefix,First_name,Middle_name,Last_name,Gender,DOB,DOJ,Mobile_number,personal_email,current_addres,permanent_address}=req.body
        // json.parse()
        const New_employee_data=await candidate_Onboarding_data.create({
            prefix,
            First_name,
            Middle_name,
            Last_name,
            Gender,
            DOB,
            DOJ,
            file_document:baseUrl+file_name,
            Mobile_number,
            personal_email,
            current_addres:JSON.parse(current_addres),
            permanent_address:JSON.parse(permanent_address)  
        }) 
        return res.status(200).send({code:200,message:"New candidate saved successfully",data:New_employee_data})
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}

exports.creating_candidate_personal_info=async(req,res)=>{
    try{
        const Onboarding_id=req.params.id;
        const {alternate_number,blood_group,Marital_status,spouse_name,Pancard,Aadhar_card_number,family_details}=req.body
        const find_candidate_personal_info=await candidate_Onboarding_data.findOne({where:{Onboarding_id:Onboarding_id}})
        if(find_candidate_personal_info){
            const create_personal_info=await candidate_Onboarding_data.update({
                alternate_number,
                blood_group,
                Marital_status,
                spouse_name,
                Pancard,
                Aadhar_card_number,
                family_details
            },{where:{Onboarding_id:Onboarding_id}})
            return res.status(200).send({code:200, message:"candidatedetail created"})
        }
        else{
            return res.status(404).send({code:404, message:"No candidate found"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}
exports.create_previous_employement=async(req,res)=>{
    try{
        const Onboarding_id=req.params.id
        const previous_employement_details=req.body.previous_employement_details
        const Onboarding_Data=await candidate_Onboarding_data.findOne({where:{Onboarding_id:Onboarding_id}})
        if(Onboarding_Data){
            const Previous_employement=await candidate_Onboarding_data.update({previous_employement_details},
                {where:{Onboarding_id:Onboarding_id}})
                return res.status(200).send({code:200,message:"previous_employement_created"})
        }
        else{
            return res.status(404).send({code:404,message:"No Onboarding Candidate found"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}
// exports.candidate_document_details=async(req,res)=>{
//     try{
//         const Onboarding_id=req.params.id
//         const Document_details=req.body.Document_details
//         // const Document_details=req.body.Document_details
//         const Onboarding_Data=await candidate_Onboarding_data.findOne({where:{Onboarding_id:Onboarding_id}})
//         if(Onboarding_Data){
//             const update_document=await candidate_Onboarding_data.update({
//                 Document_details,
//                 Onboarding_status:"Completed",
//                 status:"ACTIVE"
//             },{where:{Onboarding_id:Onboarding_id}})
//             return res.status(200).send({code:200,message:"candidate document created successfully",dta:Onboarding_Data})
//         }
//         else{
//             return res.status(404).send({code:500,message:"No Onboarding Candidate Found"})
//         }
//     }
//     catch(error){
//         console.log(error)
//         return res.status(500).send({code:500,message:"Internal Server Error"})
//     }
// }

exports.candidate_document_details=async(req,res)=>{
    try{
        const employee_id=req.params.id
        const attchment=req.file.path==undefined?" ":req.file.path
        const {document_type,document_name,description}=req.body
        // const Document_details=req.body.Document_details
        // const 
        const Onboarding_Data=await User.findOne({where:{employee_id:employee_id}})
        if(Onboarding_Data){
            const create_document= await empDocumentDetail.create({
                employee_id,
                attchment:baseUrl+attchment,
                document_type,
                document_name,
                description
            })
            return res.status(200).send({code:200,message:"candidate document created successfully", data:create_document})
        }
        else{
            return res.status(404).send({code:500,message:"No Onboarding Candidate Found"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}

exports.get_all_form_submitted=async(req,res)=>{
    try{
        const employee_id=req.params.id
        const employee_role=await User.findOne({where:{employee_id:employee_id}})
        if(employee_role.role_master_id==45){
        const onboarding_Data=await candidate_Onboarding_data.findAll({where:{Onboarding_status:"Completed"}})
        onboarding_Data.sort((a,b)=>{
            return b.Onboarding_id-a.Onboarding_id
        })
        if( onboarding_Data){
            return res.status(200).send({code:200,message:"Onboarding Data",data:onboarding_Data})
        }
        else{
            return res.status(403).send({code:403,message:"No Onboarding Data Found"})
        }
    }
    else{
        return res.status(404).send({code:404,message:"Your Role is not Hr_Admin"})
    }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}

exports.get_onboarding_candidate_by_id=async(req,res)=>{
    try{
        const Onboarding_id=req.params.id
        const employee_id=req.params.emp_id
        const employee_role=await User.findOne({where:{employee_id:employee_id}})
        if(employee_role.role==45){
        const Onboarding_candidate_data=await candidate_Onboarding_data.findOne({where:{Onboarding_id:Onboarding_id}})
        if(Onboarding_candidate_data){
            return res.status(200).send({code:200,message:"get Found",data:Onboarding_candidate_data})
        }
        else{
            return res.status(403).send({code:403,message:"No candidate found"}) 
        }
    }
    else{
        return res.status(404).send({code:404,message:"Your Role is not Hr_Admin"})
    }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}
exports.delete_onboaring_candidate=async(req,res)=>{
    try{
        const Onboarding_id=req.params.id
        const employee_id=req.params.emp_id
        const employee_role=await User.findOne({where:{employee_id:employee_id}})
        if(employee_role.role_master_id==45){
            const onboarding_Data=await candidate_Onboarding_data.findOne({where:{Onboarding_id:Onboarding_id}})
            if(onboarding_Data){
                const update_data=await candidate_Onboarding_data.update({
                    Onboarding_status:"Final Rejected",
                    status:"INACTIVE"
                },{where:{Onboarding_id:Onboarding_id}})
                return res.status(200).send({code:200, message:"Candidate Removed"})
            }
            else{
                return res.status(403).send({code:403,message:"No candidate found"}) 
            }
        }
        else{
            return res.status(404).send({code:404,message:"Your Role is not Hr_Admin"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}


exports.permanent_delete_onboaring_candidate=async(req,res)=>{
    try{
        const Onboarding_id=req.params.id
        const employee_id=req.params.emp_id
        const employee_role=await User.findOne({where:{employee_id:employee_id}})
        if(employee_role.role_master_id==45){
            const onboarding_Data=await candidate_Onboarding_data.findOne({where:{Onboarding_id:Onboarding_id}})
            if(onboarding_Data){
                const update_data=await candidate_Onboarding_data.destroy({where:{Onboarding_id:Onboarding_id}})
                return res.status(200).send({code:200,message:"Candidate Removed"})
            }
            else{
                return res.status(403).send({code:403,message:"No candidate found"}) 
            }
        }
        else{
            return res.status(404).send({code:404,message:"Your Role is not Hr_Admin"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}


exports.Hr_approving_candidate=async(req,res)=>{
    try{
        const Onboarding_id=req.params.id;
        const {employee_id}=req.body;
        const verify_role=await User.findOne({where:{employee_id:employee_id}})
        if(verify_role.role_master_id==45){
            const Onboarding_Data=await candidate_Onboarding_data.findOne({where:{Onboarding_id:Onboarding_id}})
            if(Onboarding_Data){
                const approve_candidate=await candidate_Onboarding_data.update({
                    Hr_response:"Approved",
                    Onboarding_status:"Sent to Employee List"
                },{where:{Onboarding_id:Onboarding_id}})
            return res.status(200).send({code:200,message:"Candidate Approved"})
            }
            else{
                return res.status(403).send({code:403,message:"No Onboarding data found"})
            }
        }
        else{
            return res.status(404).send({code:404,message:"Your Role is not HR_Admin"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}

exports.get_all_Onboarding_approved_emp=async(req,res)=>{
    try{
        const employee_id=req.params.id;
        const verify_role=await User.findOne({where:{employee_id:employee_id}})
            if(verify_role.role_master_id==45){
                const short_listed_data=await candidate_Onboarding_data.findAll({where:{Hr_response:"Approved"}})
                return res.status(200).send({code:200,message:"All  Approved Candidate",data:short_listed_data})
            }
            else{
                return res.status(404).send({code:404,message:"Your Role is not HR_Admin"})
            }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}

exports.Get_by_id_approved_Onboarding=async(req,res)=>{
    try{
        const Onboarding_id=req.params.id
        const employee_id=req.params.emp_id
        const verify_role=await User.findOne({where:{employee_id:employee_id}})
        if(verify_role.role_master_id==45){
            const Onboarding_Data=await candidate_Onboarding_data.findOne({where:{Onboarding_id:Onboarding_id,Hr_response:"Approved"}})
            if(Onboarding_Data){
                return res.status(200).send({code:200,message:"Onboarding Data",data:Onboarding_Data})
            }
            else{
                return res.status(403).send({code:403,message:"Not Approved by HR_Admin"})
            }
        }
        else{
            return res.status(404).send({code:404,message:"Your Role is not HR_Admin"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}
