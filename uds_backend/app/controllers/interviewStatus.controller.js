const db = require("../models/index");
const candidateProfileDetails = db.candidateProfile;
const op = db.sequelize.op;

/////////////// Get All Interview Status ///////////////

exports.getAllInterviewStatus = async (req, res) => {
    try {
        const getAllData = await candidateProfileDetails.findAll();
        if (getAllData) {
            var array = [];
            for (let i = 0; i < getAllData.length; i++) {
                var obj = {
                    "candidate_id": getAllData[i].candidate_id ? getAllData[i].candidate_id : "N/A",
                    "condidate_name": getAllData[i].condidate_name ? getAllData[i].condidate_name : "N/A",
                    "email": getAllData[i].email ? getAllData[i].email : "N/A",
                    "mobile": getAllData[i].mobile ? getAllData[i].mobile : "N/A",
                    "job_role": getAllData[i].job_role ? getAllData[i].job_role : "N/A",
                    "assigned_hiring_manager": getAllData[i].assigned_hiring_manager ? getAllData[i].assigned_hiring_manager : "N/A",
                    "spoc_name": getAllData[i].spoc_name ? getAllData[i].spoc_name : "N/A",
                    "address": getAllData[i].address ? getAllData[i].address : "N/A",
                    "round_level": getAllData[i].round_level ? getAllData[i].round_level : "N/A",
                    "interviewStatus": getAllData[i].interviewStatus ? getAllData[i].interviewStatus : "N/A"
                }
                array.push(obj)
            }
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", result: array })
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Interview Status ///////////////

exports.editInterviewStatus = async (req, res) => {
    try {
        const interviewStatusId = req.params.id;
        const { job_title, job_role, application_date, department, job_type, email, mobile, exprience, address } = req.body;
        const editData = await candidateProfileDetails.findOne({ where: { candidate_id: interviewStatusId } });
        if (editData) {
            const updateData = await candidateProfileDetails.update(
                {
                    job_title,
                    job_role,
                    application_date,
                    department,
                    job_type,
                    email,
                    mobile,
                    exprience,
                    address
                }, { where: { candidate_id: interviewStatusId } }
            );
            return res.status(200).send({ code: 200, message: "Updated Successfully", data: updateData });
        } else {
            return res.status(400).send({ code: 400, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// GetById Interview Status ///////////////

exports.getByIdInterviewStatus = async (req, res) => {
    try {
        const interviewStatusId = req.params.id;
        const interviewStatusData = await candidateProfileDetails.findOne({ where: { candidate_id: interviewStatusId } })
        if (interviewStatusData) {
            return res.status(200).send({ code: 200, message: "Fetch Data Successfully", data: interviewStatusData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};