const db = require("../../../models/index");
const amc_agreementDetails = db.AMC_Agreement;
const amcAgreementOtherDoc = db.AMC_AgreementOtherDoc;
const user_data=db.user
const baseUrl = "https://emerp.elitetraveltech.in/";

/////////////// Create AMC_Agreement///////////////

exports.create_AMC_Agreement = async (req, res) => {
    try {
        const employee_id=req.params.id
        const { name_of_agreement, request_initiated_date,first_party,second_party,third_party,fourth_party, vendor_name, company_name, description_of_amc,
            agreement_from_date, agreement_to_date, no_of_years, increment_yearly, amount, tax, total_amount,
            first_reminder, second_reminder, third_reminder, ams_status, terminate_date,Customer_Status,Remarks,notice_period } = req.body;
        if (req.file) {
            var terminateCopyUpload = req.file.path
        } else {
            var terminateCopyUpload = ""
        }
            if (req.file) {
                var terminateCopyUpload = req.file.path
            } else {
                var terminateCopyUpload = ""
            }
            const employe_data=await user_data.findOne({where:{employee_id:employee_id}})
            if(employe_data.role_master_id=='1'){
                const response = await amc_agreementDetails.create({
                    name_of_agreement,
                    request_initiated_date,
                    first_party,
                    second_party,
                    third_party,
                    fourth_party,
                    vendor_name,
                    company_name,
                    description_of_amc,
                    agreement_from_date,
                    agreement_to_date,
                    no_of_years,
                    increment_yearly,
                    amount,
                    tax,
                    total_amount,
                    first_reminder,
                    second_reminder,
                    third_reminder,
                    ams_status,
                    terminate_date,
                    terminate_copy_upload: baseUrl + terminateCopyUpload,
                    Customer_Status,
                    Remarks,
                    notice_period
                });
                return res.status(200).send({ code: 200, message: "AMC Agreement Created Successfully!", data: response });
            }
        else{
            return res.status(403).send({ code:403,message:"Your role is not admin"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Update AMC Agreement ///////////////

exports.update_AMC_Agreement = async (req, res) => {
    try {
        const amcAgreementId = req.params.id;
        const uploadAgreementCopy = req.file.path == undefined ? " " : req.file.path;
        const findOthers = await amc_agreementDetails.findOne({ where: { amc_agreement_id: amcAgreementId } });
        if (findOthers) {
            const create_other_doc = await amcAgreementOtherDoc.create({
                amc_agreement_id: amcAgreementId,
                file_name: req.body.file_name,
                upload_agreement_copy: baseUrl + uploadAgreementCopy,
            });
            return res.status(200).send({ code: 200, message: "Created Other Document Successfully", data: create_other_doc });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Edit AMC_Agreement///////////////

exports.edit_AMC_Agreement = async (req, res) => {
    try {
        const amc_agreementId = req.params.id;
        const { name_of_agreement, request_initiated_date, vendor_name, company_name, description_of_amc,
            agreement_from_date, agreement_to_date, no_of_years, increment_yearly, amount, tax, total_amount,
            first_reminder, second_reminder, third_reminder, ams_status, terminate_date } = req.body;

        var upload_agreement_copy = req.files.upload_agreement_copy == undefined ? "" : upload_agreement_copy = req.files.upload_agreement_copy[0].path;
        var terminate_copy_upload = req.files.terminate_copy_upload == undefined ? "" : terminate_copy_upload = req.files.terminate_copy_upload[0].path;
        const editData = await amc_agreementDetails.findOne({ where: { amc_agreement_id: amc_agreementId } });
        if (editData) {
            const updateData = await amc_agreementDetails.update(
                {
                    name_of_agreement,
                    request_initiated_date,
                    vendor_name,
                    company_name,
                    description_of_amc,
                    agreement_from_date,
                    agreement_to_date,
                    no_of_years,
                    increment_yearly,
                    amount,
                    tax,
                    total_amount,
                    first_reminder,
                    second_reminder,
                    third_reminder,
                    upload_agreement_copy: baseUrl + upload_agreement_copy,
                    ams_status,
                    terminate_date,
                    terminate_copy_upload: baseUrl + terminate_copy_upload,
                },
                { where: { amc_agreement_id: amc_agreementId } }
            );
            return res.status(200).send({ code: 200, message: "AMC Agreement Updated Successfull!", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById AMC Agreement ///////////////

exports.get_ById_AMC_Agreement = async (req, res) => {
    try {
        const amc_agreementId = req.params.id;
        const getData = await amc_agreementDetails.findOne({ where: { amc_agreement_id: amc_agreementId },
            include: [{
                model: amcAgreementOtherDoc,
                attributes: ["file_name", "upload_agreement_copy"]
            }]
        });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch AMC Agreement data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All AMC_Agreement///////////////

exports.get_All_AMC_Agreement = async (req, res) => {
    try {
        const getData = await amc_agreementDetails.findAll({
            where: { status: "ACTIVE" },
            include: [{
                model: amcAgreementOtherDoc,
                attributes: ["file_name", "upload_agreement_copy"]
            }]
        });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All AMC Agreement Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete AMC_Agreement ///////////////

exports.delete_AMC_Agreement = async (req, res) => {
    try {
        const amc_agreementId = req.params.id;
        const deleteData = await amc_agreementDetails.findOne({ where: { amc_agreement_id: amc_agreementId } });
        if (deleteData) {
            const dltData = await amc_agreementDetails.update({ status: "INACTIVE" }, { where: { amc_agreement_id: amc_agreementId } });
            return res.status(200).send({ code: 200, message: "Courier AMC Agreement is Deleted Successfully!", data: dltData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

exports.get_all_send_to_approval=async(req,res)=>{
    try{
        const employee_id=req.params.id;
        const employee_data=await user.findOne({where:{employee_id: employee_id}})
        if(employee_data.role_master_id=='44'){
            const approval_data=await amc_agreementDetails.findAll({where:{status:"send to approval"}})
           return res.status(200).send({code:200,message:"data fetched successfully",data:approval_data})
        }
        else{
            return res.status(403).send({code:403,message:"Your role is not Approver"})
        }
    }
    catch(error){
        console.error(error);
        return res.status(500).send({code:500,message:"Internal Server Error"})
    }
}