const db = require('../../models/index');
const itTicketingDetails = db.itTicketing;
const itTicketingPendingTask = db.itTicketing_pending_task
const userDetails = db.user
// const baseUrl = "https://emerp.elitetraveltech.in/";
const baseUrl = "https://emerp.elitetraveltech.in/";
// const baseUrl = "http://localhost:5000/"
const moment = require("moment")
const fs = require('fs');

/////////////// Create IT Tecketing ///////////////

exports.create_itTicketing = async (req, res) => {
    try {
        const { ticket_raised_by, employee_id, on_behalf_of, others_name, category, stage, subject, description, remarks, ticket_assigned_to } = req.body;
        // fs.renameSync(attachment, attachment);

        var attachment = req.files.attachment == undefined ? "" : attachment = req.files.attachment[0].path;
        // fs.renameSync(attachment, attachment);

        const response = await itTicketingDetails.create({
            ticket_raised_by,
            employee_id,
            on_behalf_of,
            others_name,
            category,
            stage,
            subject,
            description,
            attachment: baseUrl + attachment,
            remarks,
            ticket_assigned_to
        });
        return res.status(200).send({ code: 200, message: "IT Ticketing Created Successfully!", data: response });
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit IT Tecketing ///////////////

exports.edit_itTicketing = async (req, res) => {
    try {
        const itTicketing = req.params.id;
        const { ticket_raised_by, on_behalf_of, others_name, category, stage, subject, description, remarks, ticket_assigned_to} = req.body;

        var attachment = req.files.attachment == undefined ? "" : attachment = req.files.attachment[0].path;
        const editData = await itTicketingDetails.findOne({ where: { itTicketing_number: itTicketing } });
        var uploadData = attachment == '' ? attachment = editData.attachment : attachment = baseUrl + attachment

        if (editData) {
            // console.log(editData,"editData1");
            const updateData = await itTicketingDetails.update(
                {
                    ticket_raised_by,
                    on_behalf_of,
                    others_name,
                    category,
                    stage,
                    subject,
                    description, 
                    attachment: uploadData,
                    remarks,
                    ticket_assigned_to
                },
                { where: { itTicketing_number: itTicketing } }
            );

        const data = await itTicketingDetails.findOne({where: {itTicketing_number:itTicketing}})

        var objuser = {
                    "itTicketing_no": 
                    data.itTicketing_number,
                    "ticket_raised_by": data.ticket_raised_by,
                    "subject": data.subject,
                    "created_date": data.createdAt,
                    "category": data.category,
                    "assigned_to": data.ticket_assigned_to,
                    "assigned_id": data.employee_id,
                    "remarks": data.remarks,
                }
                await itTicketing_pending_task.create(objuser);
               
            
            return res.status(200).send({ code: 200, message: "IT Ticketing Updated Successfully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All IT Tecketing ///////////////

exports.get_itTicketing = async (req, res) => {
    try {
        const getAllData = await itTicketingDetails.findAll()
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All IT Ticketing Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All IT Tecketing emp name & code ///////////////

exports.get_NAME_EmpID = async (req, res) => {
    try {
        const getData = await userDetails.findAll();
        if (getData) {
            var array = [];
            for (var i = 0; i < getData.length; i++) {
                const first_name = getData[i].first_name
                const last_name = getData[i].last_name
                var obj = {
                    "employee_id": getData[i].employee_id,
                    "fullName": first_name + " " + last_name
                }
                array.push(obj);
            }
            return res.status(200).send({ code: 200, message: "Fetch Data Successfully", data: array });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" })
    }
};

/////////////// Get By User Id it Ticketing ///////////////

exports.getByUserId_itTicketing = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const getData = await itTicketingDetails.findAll({ where: { employee_id: employeeId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Get By Id Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get By Id IT Tecketing ///////////////

exports.getById_itTicketing = async (req, res) => {
    try {
        const itTicketingNumber = req.params.id;
        const getData = await itTicketingDetails.findOne({ where: { itTicketing_number: itTicketingNumber } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Get By Id Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get By ALL STATUS IT Tecketing ///////////////

exports.get_Allstatus_itTicketing = async (req, res) => {
    try {
        const getAllData = await itTicketingDetails.findAll();
        const GetAll = getAllData.length;
        if (GetAll) {
            return res.status(200).send({ code: 200, message: "Fetch All STATUS IT Ticketing Data Successfully", data: GetAll });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get By OPEN STATUS IT Tecketing ///////////////

exports.get_AllOPEN_itTicketing = async (req, res) => {
    try {
        const getAllData = await itTicketingDetails.findAll({ where: { status: "OPEN" } });
        const Allopen = getAllData.length;
        if (Allopen) {
            return res.status(200).send({ code: 200, message: "Fetch All OPEN IT Ticketing Data Successfully", data: Allopen });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get By CLOSE STATUS IT Tecketing ///////////////

exports.get_AllClose_itTicketing = async (req, res) => {
    try {
        const getAllData = await itTicketingDetails.findAll({ where: { status: "CLOSE" } });
        const Allclose = getAllData.length;
        if (Allclose) {
            return res.status(200).send({ code: 200, message: "Fetch All CLOSE IT Ticketing Data Successfully", data: Allclose });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get By IN_PROGRES STATUS IT Tecketing ///////////////

exports.get_All_inPROGRES_itTicketing = async (req, res) => {
    try {
        const getAllData = await itTicketingDetails.findAll({ where: { status: "IN-PROGRES" } });
        const AllinProgres = getAllData.length;
        if (AllinProgres) {
            return res.status(200).send({ code: 200, message: "Fetch All CLOSE IT Ticketing Data Successfully", data: AllinProgres });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


/////////////// Get All TODAY IT Tecketing ///////////////

exports.get_AllToday_itTicketing = async (req, res) => {
    try {
        let getAllData = await itTicketingDetails.findAll()
        var today = moment(new Date()).format("YYYY/MM/DD");
        let array = [];
        for (var i = 0; i < getAllData.length; i++) {
            let exitsDay = moment(getAllData[i].createdAt).format("YYYY/MM/DD");
            if (today === exitsDay) {
                array.push(getAllData[i])
            }
        }
        if (array) {
            return res.status(200).send({ code: 200, message: "Fetch All Today IT Ticketing Data Successfully", data: array });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


////////////// Get All PRE WEEK ///////////////////////

exports.getAll_preWeek_itTicketing = async (req, res) => {
    try {
        let getAllData = await itTicketingDetails.findAll()

        var date = new Date();
        date.setDate(date.getDate() - 6);
        var preDate = moment(date).format("YYYY/MM/DD");

        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate());
        var todaydate = moment(currentDate).format("YYYY/MM/DD");


        let array = [];
        for (var i = 0; i < getAllData.length; i++) {
            let exitsDay = moment(getAllData[i].createdAt).format("YYYY/MM/DD");

            if (preDate <= exitsDay && exitsDay <= todaydate) {
                array.push(getAllData[i])
            }
        }
        if (array) {
            return res.status(200).send({ code: 200, message: "Fetch All Pre Week IT Ticketing Data Successfully", data: array });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


////////////// Get All CURRENT MONTH ///////////////////////

exports.getAll_currentMonth_itTicketing = async (req, res) => {
    try {
        let getAllData = await itTicketingDetails.findAll()

        var date = new Date();
        date.setDate(date.getMonth());
        var currentMonth = moment(date).format("YYYY/MM/DD");

        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate());
        var todaydate = moment(currentDate).format("YYYY/MM/DD");


        let array = [];
        for (var i = 0; i < getAllData.length; i++) {
            let exitsDay = moment(getAllData[i].createdAt).format("YYYY/MM/DD");


            if (currentMonth <= exitsDay && exitsDay <= todaydate) {
                array.push(getAllData[i])
            }
        }
        if (array) {
            return res.status(200).send({ code: 200, message: "Fetch All Current Month IT Ticketing Data Successfully", data: array });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

////////////////// manual selected date Data showing only ///////////////////////////////////
exports.getAll_manualSelect_itTicketing = async (req, res) => {
    try {
        let { fromDate, endDate } = req.body;
        console.log("===>",req.body)
        // let getAllData = await itTicketingDetails.findAll()
        // console.log(getAllData,"getAllData")
        let getAllData = await itTicketingDetails.sequelize.query(`SELECT * FROM it_ticketings ` , {
            type: itTicketingDetails.sequelize.QueryTypes.SELECT
          })
        //   console.log(getAllData,"getAllData")

        let array = [];
        for (var i = 0; i < getAllData.length; i++) {
            let exitsDay = moment(getAllData[i].createdAt).format("YYYY/MM/DD");

            if (fromDate <= exitsDay && exitsDay <= endDate) {
                array.push(getAllData[i])
            }
        }
        if (array) {
            return res.status(200).send({ code: 200, message: "Fetch All From Date To End Date IT Ticketing Data Successfully", data: array });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////////// Get selected fields in it ticketing////////////////


exports.getSelectedFields = async (req, res) => {
    try {
        const selectData =  await itTicketingDetails.findAll({attributes: ["itTicketing_number", "category", "subject", ["status", "action"]]});
        if(selectData){
            return res.status(200).send({ code: 200, message: "Fetch All Selected Fields Data Successfully", data: selectData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
        
    } catch (error) {
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};