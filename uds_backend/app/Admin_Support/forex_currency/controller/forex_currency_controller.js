const db = require("../../../models/index");
const forex_currency_Details = db.forex_currency;
// const baseUrl = "https://emerp.elitetraveltech.in/";
const baseUrl = "https://emerp.elitetraveltech.in/";


/////////////// Create Forex Currency Without T O ///////////////

   
////////////////////////// create forex currency without T O //////////////////////////
exports.create_forex_currenct_without_t_o = async (req, res) => {
    try {
        const { req_ref_no, froex_currency, request_initiated_date, client_name, t_o_number,
            name_of_the_traveler, residental_address, email_id, mobile_number, pass_port_number,
            pass_port_issued_date, nationality, duration_from_date, duration_to_date, country_to_visit,
            currency_name, purpose, requested_amount, received_amount, received_date, returned_amount, returned_date,
            closed_date, approved_by, approved_date, reject_remarks,flight_details, date_of_departure, nature_of_business_visit } = req.body;
        const getData = await forex_currency_Details.findOne({ where: { req_ref_no: req_ref_no } })
        if (getData) {
            return res.status(403).send({ code: 403, message: "Already Exits!" })
        } else {
            const response = await forex_currency_Details.create({
                req_ref_no,
                froex_currency,
                request_initiated_date,
                client_name,
                t_o_number,
                name_of_the_traveler,
                residental_address,
                email_id,
                mobile_number,
                pass_port_number,
                pass_port_issued_date,
                nationality,
                duration_from_date,
                duration_to_date,
                country_to_visit,
                currency_name,
                purpose,
                requested_amount,
                received_amount,
                received_date,
                returned_amount,
                returned_date,
                closed_date,
                approved_by,
                approved_date,
                reject_remarks,
                flight_details, date_of_departure, nature_of_business_visit 
            })
            return res.status(200).send({ code: 200, message: "Created Successfully!", data: response });
          
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Get All List Forex Currency ///////////////

exports.getAll_list_forex_currency = async (req, res) => {
    try {
        const getAll = await forex_currency_Details.findAll();
        if (getAll) {
            return res.status(200).send({ code: 200, message: "Created Successfully!", data: getAll });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Approval Forex Currency ///////////////

exports.approval_forex_currency = async (req, res) => {
    try {
        const forex_currency_id = req.params.id;
        const getAll = await forex_currency_Details.findAll({ where: { forex_currency_id: forex_currency_id } });
        if (getAll) {
            updateData = await forex_currency_Details.update(req.body, { where: { forex_currency_id: forex_currency_id } })
            return res.status(200).send({ code: 200, message: "Update Successfully!", data: getAll });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Get ById without///////////////

exports.get_ById_without = async (req, res) => {
    try {
        const forex_currency_id = req.params.id;
        const getData = await forex_currency_Details.findOne({ where: { forex_currency_id: forex_currency_id } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

////////////////////////// UPDATE forex currency rate//////////////////////////
exports.update_forex_currency_rate = async (req, res) => {
    try {
        const forex_currency_id = req.params.id;
        const { handover_amount, handover_date, currency_rate, forex_status, reject_remarks, currency_name1, purpose,
            requested_amount, received_amount, received_date, returned_amount, returned_date } = req.body;
        var upload_memo_copy = req.files.upload_memo_copy == undefined ? "" : upload_memo_copy = req.files.upload_memo_copy[0].path;
        var lerms_letter = req.files.lerms_letter == undefined ? "" : lerms_letter = req.files.lerms_letter[0].path;
        const getAll = await forex_currency_Details.findAll({ where: { forex_currency_id: forex_currency_id } });
        if (getAll) {
            updateData = await forex_currency_Details.update({
                handover_amount,
                handover_date,
                currency_rate,
                forex_status,
                upload_memo_copy: baseUrl + upload_memo_copy,
                lerms_letter: baseUrl + lerms_letter,
                currency_name1,
                purpose,  
                reject_remarks,
                requested_amount,
                received_amount,
                received_date,
                returned_amount,
                returned_date,
                flight_details,
                date_of_departure,
                nature_of_business_visit,
            }, { where: { forex_currency_id: forex_currency_id } })
            return res.status(200).send({ code: 200, message: "Update Successfully!", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};


/////////////// Get All To List Forex Currency ///////////////

exports.getAll_To_list_forex_currency = async (req, res) => {
    try {
        const getAll = await forex_currency_Details.findAll();
        if (getAll) {
            return res.status(200).send({ code: 200, message: "Created Successfully!", data: getAll });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Approval To Forex Currency ///////////////

exports.approval_To_forex_currency = async (req, res) => {
    try {
        const forex_currency_id = req.params.id;
        const getAll = await forex_currency_Details.findAll({ where: { forex_currency_id: forex_currency_id } });
        if (getAll) {
            updateData = await forex_currency_Details.update(req.body, { where: { forex_currency_id: forex_currency_id } })
            return res.status(200).send({ code: 200, message: "Update Successfully!", data: getAll });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Update To Forex Currency Rate ///////////////

exports.update_To_forex_currency_rate = async (req, res) => {
    try {
        const forex_currency_id = req.params.id;
        const { handover_amount, handover_date, currency_rate, forex_status, reject_remarks, returned_date, returned_amount,
            flight_details, date_of_departure, nature_of_business_visit } = req.body;
        var upload_memo_copy = req.files.upload_memo_copy == undefined ? "" : upload_memo_copy = req.files.upload_memo_copy[0].path;
        var lerms_letter = req.files.lerms_letter == undefined ? "" : lerms_letter = req.files.lerms_letter[0].path;
        const getAll = await forex_currency_Details.findAll({ where: { forex_currency_id: forex_currency_id } });
        if (getAll) {
            updateData = await forex_currency_Details.update({
                handover_amount,
                handover_date,
                currency_rate,
                forex_status,
                reject_remarks,
                returned_amount,
                returned_date,
                flight_details,
                date_of_departure,
                nature_of_business_visit,
                upload_memo_copy: baseUrl + upload_memo_copy,
                lerms_letter: baseUrl + lerms_letter
            }, { where: { forex_currency_id: forex_currency_id } })
            return res.status(200).send({ code: 200, message: "Update Successfully!", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

exports.get_ById_with_Taskorder = async (req, res) => {
    try {
        const forex_currency_id = req.params.id;
        const getData = await forex_currency_Details.findOne({ where: { forex_currency_id: forex_currency_id } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

////////////////////////// GETAll Return forex currency //////////////////////////

exports.getAll_return_forex_currency = async (req, res) => {
    try {
        const getAll = await forex_currency_Details.findAll();
        if (getAll) {
            return res.status(200).send({ code: 200, message: "Created Successfully!", data: getAll });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

/////////////// Update Return Forex Currency ///////////////

exports.update_Return_forex_currency = async (req, res) => {
    try {
        const forex_currency_id = req.params.id;
        const { handover_amount, handover_date, currency_rate, forex_status, reject_remarks } = req.body;
        var upload_Encashment_Letter = req.files.upload_Encashment_Letter == undefined ? "" : upload_Encashment_Letter = req.files.upload_Encashment_Letter[0].path;
        var upload_Cash_Receipt = req.files.upload_Cash_Receipt == undefined ? "" : upload_Cash_Receipt = req.files.upload_Cash_Receipt[0].path;
        const getAll = await forex_currency_Details.findAll({ where: { forex_currency_id: forex_currency_id } });
        if (getAll) {
            updateData = await forex_currency_Details.update({
                handover_amount,
                handover_date,
                currency_rate,
                forex_status,
                reject_remarks,
                upload_Encashment_Letter: baseUrl + upload_Encashment_Letter,
                upload_Cash_Receipt: baseUrl + upload_Cash_Receipt,

            }, { where: { forex_currency_id: forex_currency_id } })
            return res.status(200).send({ code: 200, message: "Update Successfully!", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

////////////////////////// APPROVAl To forex currency //////////////////////////
exports.approval_Return_forex_currency = async (req, res) => {
    try {
        const forex_currency_id = req.params.id;
        const getAll = await forex_currency_Details.findAll({ where: { forex_currency_id: forex_currency_id } });
        if (getAll) {
            updateData = await forex_currency_Details.update(req.body, { where: { forex_currency_id: forex_currency_id } })
            return res.status(200).send({ code: 200, message: "Update Successfully!", data: getAll });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    }
};

exports.get_ById_return = async (req, res) => {
    try {
        const forex_currency_id = req.params.id;
        const getData = await forex_currency_Details.findOne({ where: { forex_currency_id: forex_currency_id } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};
