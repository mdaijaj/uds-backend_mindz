const db = require("../../../models/index");
const eventDetails = db.Events;
const Op = db.Sequelize.Op;
// const baseUrl = "https://emerp.elitetraveltech.in/";
const baseUrl = "https://emerp.elitetraveltech.in/";
const path = require("path");
const readXlsxFile = require("read-excel-file/node");
const excel = require("exceljs");

/////////////// Create Event ///////////////

exports.create_Event = async (req, res) => {
    try {
        const { request_initiation, request_initiated_date, requested_By, designation_of_person, program_name,
            budget_amount, final_amount, program_location, date_of_program, event_close_date, event_status, agreement_signed_date } = req.body;

        var upload_documents = req.files.upload_documents_copy == undefined ? "" : upload_documents = req.files.upload_documents_copy[0].path;
        var upload_vendor = req.files.upload_vendor_copy == undefined ? "" : upload_vendor = req.files.upload_vendor_copy[0].path;
        var upload_comparative = req.files.upload_comparative_copy == undefined ? "" : upload_comparative = req.files.upload_comparative_copy[0].path;
        var upload_sign = req.files.upload_sign_copy == undefined ? "" : upload_sign = req.files.upload_sign_copy[0].path;

        const response = await eventDetails.create({
            request_initiation,
            request_initiated_date,
            requested_By,
            designation_of_person,
            program_name,
            budget_amount,
            final_amount,
            program_location,
            date_of_program,
            upload_documents_copy: baseUrl + upload_documents,
            upload_vendor_copy: baseUrl + upload_vendor,
            upload_comparative_copy: baseUrl + upload_comparative,
            upload_sign_copy: baseUrl + upload_sign,
            event_close_date,
            event_status,
            agreement_signed_date
        });
        return res.status(200).send({ code: 200, message: "Event Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Event ///////////////

exports.edit_Event = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { request_initiation, request_initiated_date, requested_By, designation_of_person, program_name,
            budget_amount, final_amount, program_location, date_of_program, event_close_date, event_status, agreement_signed_date } = req.body;

        var upload_documents = req.files.upload_documents == undefined ? "" : upload_documents = req.files.upload_documents[0].path;
        var upload_vendor = req.files.upload_vendor == undefined ? "" : upload_vendor = req.files.upload_vendor[0].path;
        var upload_comparative = req.files.upload_comparative == undefined ? "" : upload_comparative = req.files.upload_comparative[0].path;
        var upload_sign = req.files.upload_sign == undefined ? "" : upload_sign = req.files.upload_sign[0].path;
        
        const editData = await eventDetails.findOne({ where: { event_id: eventId } });
        if (editData) {
            const updateData = await eventDetails.update({
                request_initiation,
                request_initiated_date,
                requested_By,
                designation_of_person,
                program_name,
                budget_amount,
                final_amount,
                program_location,
                date_of_program,
                upload_documents_copy: baseUrl + upload_documents,
                upload_vendor_copy: baseUrl + upload_vendor,
                upload_comparative_copy: baseUrl + upload_comparative,
                upload_sign_copy: baseUrl + upload_sign,
                event_close_date,
                event_status,
                agreement_signed_date
            }, { where: { event_id: eventId } });
            return res.status(200).send({ code: 200, message: "Event Updated Successfull!", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Event ///////////////

exports.get_ById_Event = async (req, res) => {
    try {
        const eventId = req.params.id;
        const getData = await eventDetails.findOne({ where: { event_id: eventId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Event data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Event ///////////////

exports.get_All_Event = async (req, res) => {
    try {
        const getData = await eventDetails.findAll({ where: { status: "ACTIVE" } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch All Event Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Event ///////////////

exports.delete_Event = async (req, res) => {
    try {
        const eventId = req.params.id;
        const deleteData = await eventDetails.findOne({ where: { event_id: eventId } });
        if (deleteData) {
            const dltData = await eventDetails.update({ status: "INACTIVE" }, { where: { event_id: eventId } });
            return res.status(200).send({ code: 200, message: "Event is Deleted Successfully!", data: dltData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Remote Status Open ///////////////

exports.get_All_Event_Status_Open = async (req, res) => {
    try {
        const find_Open = await eventDetails.findAll({ where: { event_status: "OPEN" } })
        let open_length = find_Open.length;
        if (find_Open.length > 0) {
            return res.status(200).send({ code: 200, message: "Fetch All Event Status Open Data Successfully!", data: open_length })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" })
    }
}

/////////////// Get All Remote Status Closed ///////////////

exports.get_All_Event_Status_Closed = async (req, res) => {
    try {
        const find_Closed = await eventDetails.findAll({ where: { event_status: "CLOSED" } })
        let closed_lengeth = find_Closed.length;
        if (find_Closed.length > 0) {
            return res.status(200).send({ code: 200, message: "Fetch All Event Status Closed Data Successfully!", data: closed_lengeth })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" })
    }
}

/////////////// Get All Remote Status Rejected ///////////////

exports.get_All_Event_Status_Rejected = async (req, res) => {
    try {
        const find_Rejected = await eventDetails.findAll({ where: { event_status: "REJECTED" } })
        let rejected_length = find_Rejected.length;
        if (find_Rejected.length > 0) {
            return res.status(200).send({ code: 200, message: "Fetch All Event Status Rejected Data Successfully!", data: rejected_length })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" })
    }
}

/////////////// Get All Remote Status Inprogress ///////////////

exports.get_All_Event_Status_Inprogress = async (req, res) => {
    try {
        const find_Inprogress = await eventDetails.findAll({ where: { event_status: "INPROGRESS" } })
        let inprogress_length = find_Inprogress.length;
        if (find_Inprogress.length > 0) {
            return res.status(200).send({ code: 200, message: "Fetch All Event Status Inprogress Data Successfully!", data: inprogress_length })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" })
    }
}