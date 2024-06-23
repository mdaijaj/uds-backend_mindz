const { body } = require("express-validator");
const db = require("../models/index");
const scheduleFixedInterviewDetails = db.scheduleFixedInterview;
const user_model=db.user;
const candidateProfileDetails = db.candidateProfile;
const postVacancyDetails = db.jobDescription;
const lms_notification_model=db.lms_author_notification
const op = db.sequelize.op;
const User=db.user
const transport=require("../services/nodemailer")

/////////////// Fixed schedule Interview ///////////////

exports.schedule_FixedInterview = async (req, res) => {

    try {
        const { candidate_id,employee_id, interviewer_name, mode_of_interview, round_level, schedule_interview_date,assigned_hiring_manager_id,job_applied, schedule_interview_time, remark, action } = req.body;
        const findData = await scheduleFixedInterviewDetails.findOne({ where: { round_level: round_level } })
        const access = await User.findOne({ where: {employee_id:employee_id} });
        if(access.role_master_id == 18 || access.role_master_id == 45){
            var response = await scheduleFixedInterviewDetails.create({
                candidate_id,
                round_level,
                mode_of_interview,
                interviewer_name,
                schedule_interview_date,
                schedule_interview_time,
                remark,
                action
            });
        
        var data1 = await candidateProfileDetails.findOne({ where: { candidate_id: candidate_id } });
        if (data1) {
            const canData1 = await candidateProfileDetails.update({
                schedule_interview_date,
                schedule_interview_time
            }, { where: { candidate_id: candidate_id } });
        const Invterview_data=await User.findOne({where:{employee_id:data1.assigned_hiring_manager_id}})
        const employee_id=data1.assigned_hiring_manager_id
        const emp_name=Invterview_data.first_name
        const employee_official_email=Invterview_data.employee_official_email
        const role=Invterview_data.user_role
        const message=`Hi ${emp_name} you assigned as an Interviewer to ${data1.condidate_name} for ${round_level} round `
        const create_notification=await lms_notification_model.create({
            employee_id,
            emp_name,
            employee_official_email,
            role,
            remark:message,
            type:"HRMS"
        })

     
        const candidate_info = await candidateProfileDetails.findOne({ where: { candidate_id: candidate_id } });
        let info = await transport.mailsend({
            from: "dqsindia.erp@gmail.com",
            to: data1.email,
            cc: "",
            bcc: "",
            subject: "Interview Schdule Details!!!!!!!!",
            html: `<p><strong>Hi ${candidate_info.condidate_name}</strong> <br>Your round ${round_level} Interview has been schduled with ${candidate_info.assigned_hiring_manager} for the
            profile of ${req.body.job_applied}  
            <br>
            kindly join the meeting at
            ${schedule_interview_time} on ${schedule_interview_date}
            Your <strong>Official Email Id is</strong></p>`
        });

        const job = await candidateProfileDetails.findOne({ where: { candidate_id: candidate_id } });
        let info2 = await transport.mailsend({
            from: "dqsindia.erp@gmail.com",
            to: Invterview_data.employee_official_email,
            cc: "",
            bcc: "",
            subject: "Interview Schdule Details!!!!!!!!",
            html: `<p><strong>Hi ${data1.assigned_hiring_manager}</strong> <br>You have been assign an  interviewer  of ${data1.condidate_name} for the
            profile of ${req.body.job_applied}  for  round ${round_level}
            <br>
            kindly join the meeting at
            ${schedule_interview_time} on ${schedule_interview_date}
            <br>
            Your <strong>Official Email Id is</strong></p>`
        });
        return res.status(200).send({ code: 200, message: "Fixed Interview Created Successfully!", data: response });
        }
    } else{
        return res.status(404).send({ code: 404, message: "Only hr can schedule Interview" });
    }
    } 
   catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Schedule FixedInterview ///////////////
exports.editSchedule_FixedInterview = async (req, res) => {
    try {
        const fixedInterviewId = req.params.id;
        var final_shortlist=req.body.final_shortlisted==true?final_shortlist=1:final_shortlist=0
        const { candidate_id, interviewer_name, mode_of_interview, round_level, schedule_interview_date, schedule_interview_time, remark, action, final_shortlisted } = req.body;
        const editData = await scheduleFixedInterviewDetails.findOne({ where: { interview_id: fixedInterviewId } });
        if (editData && req.body.action=="Shortlisted") {
            const updateData = await scheduleFixedInterviewDetails.update({
                candidate_id,
                round_level,
                mode_of_interview,
                interviewer_name,
                schedule_interview_date,
                schedule_interview_time,
                remark,
                action:"Shortlisted",
                final_shortlisted
            }, { where: { interview_id: fixedInterviewId } });
            const data1 = await candidateProfileDetails.findOne({ where: { candidate_id: candidate_id } });
            if (data1) {
                const canData = await candidateProfileDetails.update({
                    status:"Shortlisted",
                    schedule_interview_date,
                    schedule_interview_time
                }, { where: { candidate_id: candidate_id } });
            }
            let info = await transport.mailsend({
                from: "dqsindia.erp@gmail.com",
                to: data1.email,
                cc: "",
                bcc: "",
                subject: "Interview Result Update!!!!!!!!",
                html: `<p><strong>Hi ${data1.condidate_name}</strong> <br>After Reviewing your Profile we are pleased to inform you that you are shortlisted for ${round_level} rounds of interview 
                Your <strong> For further mail kindlt connected to us!!!!!!</strong></p>`
            });
            return res.status(200).send({ code: 200, message: "Fixed Interview Updated Successfully", data: updateData });
        } 
        else if (editData && req.body.action=="Rejected") {
            const updateData = await scheduleFixedInterviewDetails.update({
                candidate_id,
                round_level,
                mode_of_interview,
                interviewer_name,
                schedule_interview_date,
                schedule_interview_time,
                remark,
                action:"Rejected",
                final_shortlisted
            }, { where: { interview_id: fixedInterviewId } });
            const data1 = await candidateProfileDetails.findOne({ where: { candidate_id: candidate_id } });
            if (data1) {
                const canData = await candidateProfileDetails.update({
                    status:"Rjected",
                    schedule_interview_date,
                    schedule_interview_time
                }, { where: { candidate_id: candidate_id } });
            }
            let info = await transport.mailsend({
                from: process.env.EMAIL_FROM,
                to: data1.email,
                cc: "",
                bcc: "",
                subject: "Interview Result Update!!!!!!!!",
                html: `<p><strong>Hi ${data1.condidate_name}</strong> <br>After Reviewing your Profile we are regret to inform you that you are not  shortlist for the further rounds of interview 
                Your <strong> For further opennings in DQS kindly connected to us!!!!!!</strong></p>`
            });
            return res.status(200).send({ code: 200, message: "Fixed Interview Updated Successfully", data: updateData });
        } 
        else if( req.body.final_shortlisted==true){
            const updateData = await scheduleFixedInterviewDetails.update({
                candidate_id,
                round_level,
                mode_of_interview,
                interviewer_name,
                schedule_interview_date,
                schedule_interview_time,
                remark,
                action,
                final_shortlisted
            }, { where: { interview_id: fixedInterviewId } });
            const data1 = await candidateProfileDetails.findOne({ where: { candidate_id: candidate_id } });
            if (data1) {
                const canData = await candidateProfileDetails.update({
                    status:"final_shortlisted",
                    schedule_interview_date,
                    schedule_interview_time
                }, { where: { candidate_id: candidate_id } });
            }
            let info = await transport.mailsend({
                from: process.env.EMAIL_FROM,
                to: data1.email,
                cc: "",
                bcc: "",
                subject: "Interview Result Update!!!!!!!!",
                html: `<p><strong>Hi ${data1.condidate_name}</strong> <br>After Reviewing your Profile we are pleased to inform you that you are Finally  shortlist for the DQS for the role of  
                ${data1.job_applied} <strong> !!!!!!</strong></p>`
            });
            return res.status(200).send({ code: 200, message: "Fixed Interview Updated Successfully", data: updateData });
        }
        else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


exports.schdule_interview_date = async (req, res) => {
    try {
        const fixedInterviewId = req.params.id;
        let { candidate_id, interviewer_name, mode_of_interview, round_level, schedule_interview_date, schedule_interview_time, remark, action, final_shortlisted } = req.body;
        const editData = await scheduleFixedInterviewDetails.findOne({ where: { interview_id: fixedInterviewId } });
        
        if (editData ) {
            const updateData = await scheduleFixedInterviewDetails.update({
                candidate_id,
                round_level,
                mode_of_interview,
                interviewer_name,
                schedule_interview_date,
                schedule_interview_time,
                remark,
                // action:"Rejected",
                final_shortlisted
            }, { where: { interview_id: fixedInterviewId } });
            const data1 = await candidateProfileDetails.findOne({ where: { candidate_id: candidate_id } });
            if (data1) {
                const canData = await candidateProfileDetails.update({
                    schedule_interview_date,
                    schedule_interview_time
                }, { where: { candidate_id: candidate_id } });
            }
           const manager_Data=await user_model.findOne({where:{employee_id: data1.assigned_hiring_manager_id}})
           const manager_email_id = manager_Data.employee_official_email
           const manager_name = manager_Data.first_name
           const employee_id=manager_Data.employee_id
           const emp_name=manager_Data.first_name
           const role=manager_Data.user_role
           const role_id=manager_Data.role_master_id
           const message=`Hi ${interviewer_name} you assign as an Interviewer to ${data1.condidate_name}
           for round ${round_level}`

        let info = await transport.mailsend({
            from: process.env.EMAIL_FROM,
            to: data1.email,
            cc: "",
            bcc: "",
            subject: "Invitation Interview !!!!!!!!",
            html: `<p><strong>Hi ${data1.condidate_name}</strong> <br>After Reviewing your Profile we are pleased to inform you that you have shortlist for ${round_level}  round of interview 
            Your <strong> For further mail kindly connected to us!!!!!!</strong></p>`
        });

        let info2 = await transport.mailsend({
            from: process.env.EMAIL_FROM,
            to: manager_email_id,
            cc: "",
            bcc: "",
            subject: "Invitation for Taking Interview !!!!!!!!",
            html: `<p><strong>Hi ${manager_name}</strong> <br>We are Inviting you to take the Interview Of ${data1.condidate_name} for
            the role of ${data1.job_title} as a Hiring Manager <strong> For further mail kindlt connected to us!!!!!!</strong></p>`
        });
            const create_notification=await lms_notification_model.create({
                employee_id,
                emp_name,
                employee_official_email:manager_email_id,
                role,
                role_id,
                remark:message
            })
        return res.status(200).send({ code: 200, message: "Fixed Interview Updated Successfully", data: updateData });
        } 
        
        else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};
/////////////// Reject Fixed Interview ///////////////

exports.reject_fixedinterview = async (req, res) => {
    try {
        const interviewId = req.params.id;
        const { status } = req.body;
        const editData = await scheduleFixedInterviewDetails.findOne({ where: { interview_id: interviewId } });
        if (editData) {
            const updateData = await scheduleFixedInterviewDetails.update(
                {
                    status
                }, { where: { interview_id: interviewId } }
            );
            return res.status(200).send({ code: 200, message: "Updated Successfully", data: updateData });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}

/////////////// Final Shortlisted Candidate ///////////////

exports.final_Shortlisted_Candidate = async (req, res) => {
    try {
        const getData = await candidateProfileDetails.findAll({
            where: { final_interview_status: "Shortlisted" },
            // attributes: ['candidate_id', "condidate_name"]
        })
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}

exports.final_update_ShortlistedCandidate = async (req, res) => {
    try {
        const candidateId = req.params.id;
        const { final_interview_status,date_of_joining } = req.body
        const getData = await scheduleFixedInterviewDetails.findAll({ where: { candidate_id: candidateId } })
        // const postData = await postVacancyDetails.findOne({ where: { job_title_id: req.body.job_applied } })
        // const data111 = postData.number_of_position

        // let getAllData = await candidateProfileDetails.sequelize.query(`SELECT * from candidate_profiles where job_applied = "${req.body.job_applied}"`, {
        //     type: candidateProfileDetails.sequelize.QueryTypes.SELECT
        // });
        // const count1 = getAllData.length

        // if (data111 > count1) {
        // } else {
        //     return res.status(405).send({ code: 405, message: "Seat is not available" });
        // }
        if(getData){
        for (let i = 0; i < getData.length; i++) {
            if (getData[0].action == "Shortlisted") {
                const updateData = await candidateProfileDetails.update({
                    final_interview_status,
                    date_of_joining
                }, { where: { candidate_id: candidateId } });
                return res.status(200).send({ code: 200, message: "Update Data Successfully", data: updateData });
            } else {
                return res.status(403).send({ code: 403, message: "Record Not Found" });
            }
        }
    }
    else{
        return res.status(404).send({ code: 404, message: "No candidate found" });
    }
        // } else {
        //     return res.status(405).send({ code: 405, message: `Seat is not available for ${job_applied}` });
        // }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}           


exports.get_All_Assign_By = async (req, res) => {
    try {
        const get_Data = await db.user.findAll({
            where: { role_master_id: 18, },
            attributes: ["employee_id","first_name","last_name","employee_code"]
        })
        if (get_Data) {
            return res.status(200).send({ code: 200, message: "List of All Hr", data: get_Data });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
}

exports.get_All_manager=async(req,res)=>{
    try{
        const User_Role=await User.findAll({where:{role_master_id:"28"},
        attributes: ["employee_id", "first_name", "last_name"]})
        if(User_Role){
            return res.status(200).send({ code: 200, message:"Managers List",data:User_Role });
        }
        else{
            return res.status(403).send({ code: 403, message: "No Managers Found" });
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
}