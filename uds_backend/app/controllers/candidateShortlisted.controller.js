const db = require("../models/index");
const candidateProfileDetails = db.candidateProfile;

/////////////// Get All Candidate ShortListed ///////////////

exports.getAllCandidateShortListed = async (req, res) => {
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
                    "job_title": getAllData[i].job_title ? getAllData[i].job_title : "N/A",
                    "application_date": getAllData[i].application_date ? getAllData[i].application_date : "N/A",
                    "upload_resume": getAllData[i].upload_resume ? getAllData[i].upload_resume : "N/A",
                    "spoc_name": getAllData[i].spoc_name ? getAllData[i].spoc_name : "N/A"
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

/////////////// Edit Candidate ShortListed ///////////////

exports.editCandidateShortlisted = async (req, res) => {
    try {
        const shortListedId = req.params.id;
        const { condidate_name, email, mobile, assigned_hiring_manager, job_title, job_role, application_date, department, job_type, exprience, address,
            interviewCount } = req.body;
        const editData = await candidateProfileDetails.findOne({ where: { candidate_id: shortListedId } });
        if (editData) {
            const updateData = await candidateProfileDetails.update(
                {
                    condidate_name,
                    email,
                    mobile,
                    assigned_hiring_manager,
                    job_title,
                    job_role,
                    application_date,
                    department,
                    job_type,
                    exprience,
                    address,
                    interviewCount
                }, { where: { candidate_id: shortListedId } }
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

/////////////// Get By Id Candidate ShortListed ///////////////

exports.getByIdCandidateShortlisted = async (req, res) => {
    try {
        const shortListedId = req.params.id;
        const shortListedData = await candidateProfileDetails.findOne({ where: { candidate_id: shortListedId } })
        if (shortListedData) {
            return res.status(200).send({ code: 200, message: "Fetch Data Successfully", data: shortListedData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get Candidate Shortlisted ///////////////

exports.getCandidateShortlisted = async (req, res) => {
    try {
        const getAllData = await candidateProfileDetails.findAll({
            where: { status: "Shortlisted" },
            attributes: ['condidate_name', 'candidate_id', 'status']
        })
        getAllData.reverse()
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get Final Candidate Shortlisted ///////////////

exports.getfinalCandidateShortlisted = async (req, res) => {
    try {
        const getAllData = await candidateProfileDetails.findAll({
            where: { final_interview_status: ["Shortlisted", "Reject"] },
            attributes: ['candidate_id', 'condidate_name', 'email', 'mobile', 'job_type', 'application_date', 'final_interview_status']
        })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Final Candidate Shortlisted ///////////////

exports.getbyidfinalCandidateShortlisted = async (req, res) => {
    try {
        const candidate_id = parseInt(req.params.candidate_id);
        const getAllData = await candidateProfileDetails.findOne({
            where: { final_interview_status: ["Shortlisted", "Reject"], candidate_id: candidate_id },
            attributes: ['candidate_id', 'condidate_name', 'email', 'mobile', 'job_type', 'application_date', 'final_interview_status'],
        })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Final Candidate Shortlisted ///////////////

exports.deletefinalCandidateShortlisted = async (req, res) => {
    try {
        const candidate_id = parseInt(req.params.candidate_id);
        const dltcandidate = await candidateProfileDetails.findOne({ where: { candidate_id: candidate_id } })
        if (dltcandidate) {
            const deleteData = await candidateProfileDetails.update({ final_interview_status: "Reject" }, { where: { candidate_id: candidate_id } });
            return res.status(200).send({ code: 200, message: "final Candidate Shortlisted Data is Rejected Successfully!", data: deleteData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};