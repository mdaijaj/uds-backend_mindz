const db = require("../../../models/index");
const vendorManagementDetails = db.vendorManagement;
const bank_Details = db.bankDetails;
const dcoumentDetails = db.dcoumentDetail;
const Procurement_productDetails = db.procurement_product;
const vendor_product_Details = db.vendor_product_details;
const { Op, where } = require("sequelize");
const moment = require("moment");
const transport = require("../../../services/nodemailer");
const baseUrl = "https://emerp.elitetraveltech.in/";

//////////////////// Create Vendor Management //////////////////

exports.create_Vendor_Management = async (req, res) => {
    try {
        const {vendor_name, address, country_id, country_name, state_id, state_name,city_id, city_name,
            pin, contact_number, alternative_number, email, web, fax,contact_person,under_gst, pan,CIN_No, gst_in, description_of_goods, msme, term_and_conditions, web_site_url, currency,remarks, asset_category_id } = req.body;
        const data = await vendorManagementDetails.findOne({ where: { email: email } })
        if (data) {
            return res.status(400).send({ code: 400, message: "Email Already Exits!" })
        } else {
            function vendorCode() {
                var digits = '0123456789';
                var rendomNumber = '';
                for (let i = 0; i < 4; i++) {
                    var rendomCode = Math.floor(Math.random() * 10);
                    rendomNumber = rendomNumber + digits[rendomCode];
                }
                return rendomNumber;
            }
            const vendorRendomCode = vendorCode();
            const response = await vendorManagementDetails.create({
                vendor_name,
                vendor_code: vendorRendomCode,
                address,
                country_id,
                country_name,
                state_id,
                state_name,
                city_id,
                city_name,
                pin,
                contact_number,
                alternative_number,
                email,
                web_site_url,
                web,
                fax,
                contact_person,
                under_gst,
                pan,
                CIN_No,
                gst_in,
                description_of_goods,
                msme,
                term_and_conditions,
                currency,
                remarks,
                asset_category_id
            });
            info = await transport.mailsend({
                from: process.env.EMAIL_FROM,
                to: req.body.email,
                subject: 'Link for send Email EM_ERP India',
                html: `<p><strong> Hi ${vendor_name}</strong> <br> <p style=" padding: 3%; background-image: url('https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg');"> 
                          Thanks for getting started with EM_ERP India! Simply click the button below to link for Vendor Management ${email} <a href = ${web_site_url}?id=${response.vendor_management_id}
                          <button class="btn" style="padding: 6px 8px; border-radius: 7px;cursor: pointer; border-color: blue; color: white; background-color:blue;" > Click Me </button>`
            });
            return res.status(200).send({ code: 200, message: "Vendor Management Created Successfully!", data: response })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

//////////////////// Edit Vendor Management //////////////////

exports.edit_Basic_Details_Vendor_Management = async (req, res) => {
    try {
        const vendorManagementId = req.params.id;
        const {vendor_name, vendor_code, address, country_id, country_name, state_id, state_name,
            city_id, city_name, pin, contact_number, alternative_number, email, web, fax, contact_person, under_gst, pan, CIN_No, gst_in, description_of_goods, msme, currency, term_and_conditions } = req.body;
        const editData = await vendorManagementDetails.findOne({ vendor_management_id: vendorManagementId })
        if (editData) {
            const updateData = await vendorManagementDetails.update({
                vendor_name,
                vendor_code,
                address,
                country_id,
                country_name,
                state_id,
                state_name,
                city_id,
                city_name,
                pin,
                contact_number,
                alternative_number,
                email,
                web,
                fax,
                contact_person,
                under_gst,
                pan,
                CIN_No,
                gst_in,
                description_of_goods,
                msme,
                currency,
                term_and_conditions
            }, { where: { vendor_management_id: vendorManagementId } });
            return res.status(200).send({ code: 200, message: "Vendor Management Updated Successfully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" })
    };
};

/////////////// Edit Bank Details Vendor Management ///////////////

exports.edit_BankDetail_Vendor_Management = async (req, res) => {
    try {
        const vendorManagementId = req.params.id;
        const { branch_city, bank_name, branch, bank_address, country_id, country_name, state_id, state_name, city_id, city_name,
            account_type, bank_account_number, ifsc_number, account_holder_name, swift_code, micr_code } = req.body;
        const editData = await vendorManagementDetails.findOne({ vendor_management_id: vendorManagementId })
        if (editData) {
            const updateData = await vendorManagementDetails.update({
                branch_city,
                bank_name,
                branch,
                bank_address,
                country_id,
                country_name,
                state_id,
                state_name,
                city_id,
                city_name,
                account_type,
                bank_account_number,
                ifsc_number,
                account_holder_name,
                swift_code,
                micr_code
            }, { where: { vendor_management_id: vendorManagementId } });
            return res.status(200).send({ code: 200, message: "Vendor Management Updated Successfully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" })
    };
};

/////////////// Edit Document Vendor Management ///////////////

exports.edit_Document_Vendor_Management = async (req, res) => {
    try {
        const vendorManagementId = req.params.id;
        const { document_type, expiry_date, document_name,remarks, document_status } = req.body;
        var documentUpload = req.files.upload_document == undefined ? "" : upload_document = req.files.upload_document[0].path;
        const edit_Data = await vendorManagementDetails.findOne({ where: { vendor_management_id: vendorManagementId } });
        var documentUpload = documentUpload == '' ? documentUpload = edit_Data.documentUpload : documentUpload = baseUrl + documentUpload;
        if (edit_Data) {
            const updateData = await vendorManagementDetails.update({
                document_type,
                upload_document: documentUpload,
                expiry_date,
                document_name,remarks,
                document_status
            }, { where: { vendor_management_id: vendorManagementId } });
            return res.status(200).send({ code: 200, message: "Document Vendor Management Updated Successfully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" })
    };
};

/////////////// Verify Vendor Management ///////////////

exports.verify_Vendor_Management = async (req, res) => {
    try {
        const vendorManagementId = req.params.id;
        const { document_status } = req.body;
        const edit_Data = await vendorManagementDetails.findOne({ where: { vendor_management_id: vendorManagementId } });
        if (edit_Data) {
            const updateData = await vendorManagementDetails.update({ document_status }, { where: { vendor_management_id: vendorManagementId } });
            return res.status(200).send({ code: 200, message: "Verify Vendor Management Updated Successfully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" })
    };
};

/////////////// Get All Verfiy Vendor Management ///////////////

exports.get_All_Verfiy_Vendor_Management = async (req, res) => {
    try {
        const getAllData = await vendorManagementDetails.findAll({ where: { document_status: "VERIFY" } })
        const getAllData1 = await Procurement_productDetails.findAll({ where: { po_status: "ISSUED INVOICE" } });
        let arr = [];
        for (let i = 0; i < getAllData1.length; i++) {
            const getVendorData = await vendor_product_Details.findOne({ where: { procurement_product_id: getAllData1[i].procurement_product_id } })
            const getAllData = await vendorManagementDetails.findOne({ where: { document_status: "VERIFY", vendor_management_id: getVendorData.vendors } })

            arr.push(getAllData)
        }
        let result = getAllData.concat(arr);
        
        return res.status(200).send({ code: 200, message: "Fetch data Successfully", data: result });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get ById Vendor Management ///////////////

exports.get_ById_Vendor_Management = async (req, res) => {
    try {
        const vendorManagementId = req.params.id;
        const getData = await vendorManagementDetails.findOne({ where: { vendor_management_id: vendorManagementId } });
        return res.status(200).send({ code: 200, message: "Fetch data Successfully", data: getData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Vendor Management ///////////////

exports.get_All_Vendor_Management = async (req, res) => {
    try {
        const getAllData = await vendorManagementDetails.findAll({
            include: [{
                model: bank_Details
            }, {
                model: dcoumentDetails
            }]
        })
        return res.status(200).send({ code: 200, message: "Fetch All Vendor Management Data Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Vendor Management ///////////////

exports.get_All_Active_Vendor_Management = async (req, res) => {
    try {
        const getAllData = await vendorManagementDetails.findAll({ where: { vendor_status: "ACTIVE" } })
        return res.status(200).send({ code: 200, message: "Fetch All Active Vendor Management Data Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Vendor Management ///////////////

exports.get_All_Inactive_Vendor_Management = async (req, res) => {
    try {
        const getAllData = await vendorManagementDetails.findAll({ where: { vendor_status: "INACTIVE" } })
        return res.status(200).send({ code: 200, message: "Fetch All Inactive Vendor Management Data Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Edit Status Vendor Management ///////////////

exports.edit_Status_Vendor_Management = async (req, res) => {
    try {
        const vendorManagementId = req.params.id;
        const { vendor_status, is_active } = req.body;
        const editData = await vendorManagementDetails.findOne({ vendor_management_id: vendorManagementId })
        if (editData) {
            const updateData = await vendorManagementDetails.update({
                vendor_status,
                is_active
            }, { where: { vendor_management_id: vendorManagementId } });
            return res.status(200).send({ code: 200, message: "Vendor Management Status Updated Successfully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" })
    };
};

/////////////// Delete Vendor Management ///////////////

exports.delete_Vendor_Management = async (req, res) => {
    try {
        const vendorManagementId = req.params.id;
        const { vendor_status } = req.body
        const getData = await vendorManagementDetails.findOne({ where: { vendor_management_id: vendorManagementId } });
        if (getData) {
            const updated = await vendorManagementDetails.update({ vendor_status }, { where: { vendor_management_id: vendorManagementId } });
            return res.status(200).send({ code: 200, message: "Vendor Management Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Note Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Account Approved Vendor Management ///////////////

exports.get_All_Account_Approved_Vendor_Management = async (req, res) => {
    try {
        const getAllData = await vendorManagementDetails.findAll({ where: { vendor_status: "ACCOUNT APPROVED" } })
        return res.status(200).send({ code: 200, message: "Fetch All Account Approved Vendor Management Data Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Reject Vendor Management ///////////////

exports.get_All_Reject_Vendor_Management = async (req, res) => {
    try {
        const getAllData = await vendorManagementDetails.findAll({ where: { vendor_status: "REJECTED" } })
        return res.status(200).send({ code: 200, message: "Fetch All Reject Vendor Management Data Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};