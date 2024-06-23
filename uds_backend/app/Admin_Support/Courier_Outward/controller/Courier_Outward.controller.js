const db = require("../../../models/index");
const CourierOutwardDetails = db.Courier_Outward;
const Op = db.Sequelize.Op;
const userDetails = db.user
// const baseUrl = "https://emerp.elitetraveltech.in/";
const baseUrl = "https://emerp.elitetraveltech.in/";
const transport = require("../../../services/nodemailer");
/////////////// Create Courier_Outward///////////////

exports.create_Courier_Outward = async (req, res) => {
    try {
        const employee_id=req.params.id
        const { from_whom,emp_id,department,employee_mail_id,received_date,received_By,courier_outward_type,courier_contain,document_type,client_name_to_dispatch,
            client_address_to_dispatch,Receiver_contact_number,courier_service_name,consignment_number,dispatched_by,dispatched_date,outward_status } = req.body;
       const emp_data=await userDetails.findOne({where:{employee_id:employee_id}})
       if(emp_data.user_role=='Administration'){
        const response = await CourierOutwardDetails.create({
            from_whom,
            emp_id,
            department,
            employee_mail_id,
            received_date,
            received_By,
            courier_outward_type,
            courier_contain,
            document_type,
            client_name_to_dispatch,
            client_address_to_dispatch,
            Receiver_contact_number,
            courier_service_name,
            consignment_number,
            dispatched_by,
            dispatched_date,outward_status,
            employee_id
        });
        return res.status(200).send({ code: 200, message: "Courier Outward Name Created Successfully!", data: response });
       }
       else{
        res.status(404).send({ code: 404, message:"Your Role is not Administrator" });
       }
    } 
    catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Courier_Outward ///////////////

exports.edit_Courier_Outward = async (req, res) => {
    try {
        const employee_id = req.params.id;
        const { Courier_OutwardId,date_of_delivery, outward_status, remarks } = req.body;
        if (req.file) {
            var doc = req.file.path
        } else {
            var doc = ""
        }
        const Emp_data=await userDetails.findOne({where:{employee_id: employee_id}})
        if(Emp_data.user_role='Administration'){
        const editData = await CourierOutwardDetails.findOne({ where: { courier_Outward_id: Courier_OutwardId } });
        if (editData) {
            const updateData = await CourierOutwardDetails.update(
                {
                    date_of_delivery:date_of_delivery,
                    proof_of_delivery: baseUrl + doc,
                    outward_status,
                    remarks
                },
                { where: { courier_Outward_id: Courier_OutwardId } }
            );
            info = await transport.mailsend({
                from: "dqsindia.erp@gmail.com",
                to: editData.employee_mail_id,
                subject: `Dqs- Courier ${outward_status} Succesfully!!!!!!!!!!!! `,
                html: `<p><strong>Hi &nbsp; ${editData.from_whom} </strong> <br>  
                        your courier has been ${outward_status}
                        <br></br><br></br><br></br><br></br>
                        Thanks Regards<br></br>
                        DQS Team
                </p>`,
              });
            return res.status(200).send({ code: 200, message: "Courier Outward Name Updated Successfull!", data: updateData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    }
    else{
        res.status(404).send({ code: 404, message: "Your Role is not Administrator" });
    }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};






exports.get_employee_data = async (req, res) => {
    try {
        const Courier_OutwardId = req.params.id;
        const employee_id=req.params.emp_id;

        const Emp_data=await userDetails.findOne({where:{employee_id:employee_id}})
        if(Emp_data.user_role='Administration'){
        const getData = await CourierOutwardDetails.findOne({ where: { courier_Outward_id: Courier_OutwardId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Courier Outward Name data Successfully", data: getData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    }
    else{
        return res.status(404).send({ code: 404, message: "Your Role is not Admin"})
    }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Courier_Outward ///////////////

exports. employee_data= async (req, res) => {
    try {
        const employee_id = req.params.id;
        // const employee_id2=req.params.emp_id;
        const Emp_data=await userDetails.findOne({where:{employee_id:employee_id}})
        if(Emp_data){
        const getData = await CourierOutwardDetails.findAll({ where: { emp_id:employee_id } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Courier Outward Name data Successfully", data: getData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    }
    else{
        return res.status(403).send({ code: 403, message: "User role is not autherized"})
    }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Courier_Outward///////////////

exports.get_All_Courier_Outward = async (req, res) => {
    try {
        const employee_id=req.params.id;
        const Emp_data=await userDetails.findOne({where:{ employee_id: employee_id}})
        if(Emp_data.user_role=='Administration'){
        const getData = await CourierOutwardDetails.findAll({
            where: { status: "ACTIVE" }
        });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All Courier Outward Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    }
    else{
        return res.status(404).send({ code: 404,message:"Your Role is not Admin"})
    }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Courier_Outwar///////////////

exports.delete_Courier_Outward = async (req, res) => {
    try {
        Courier_OutwardId = req.params.id;
        const deleteData = await CourierOutwardDetails.findOne({ where: { courier_Outward_id: Courier_OutwardId } });
        if (deleteData) {
            const dltData = await CourierOutwardDetails.update({ status: "INACTIVE" }, { where: { courier_Outward_id: Courier_OutwardId } });
            return res.status(200).send({ code: 200, message: "Courier Service name Data is Deleted Successfully!", data: dltData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};