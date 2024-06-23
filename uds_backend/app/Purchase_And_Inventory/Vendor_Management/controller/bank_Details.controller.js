const db = require("../../../models/index");
const bank_Details = db.bankDetails;
const vendorManagementDetails = db.vendorManagement;
const op = db.Sequelize.Op

/////////////// Create Bank Details Vendor Management ///////////////

exports.create_Bank_Details_Vendor_Management = async (req, res) => {
    try {
        const { vendor_management_id, bank_name, branch, bank_address, country_id, country_name, state_id, state_name, branch_city, contact_number, fax, account_type, bank_account_number, ifsc_number,
            account_holder_name, swift_code, micr_code } = req.body;
        if (vendor_management_id) {
            const vendorData = await vendorManagementDetails.findOne({ where: { vendor_management_id: vendor_management_id } })
            if (vendorData) {
                const response = await bank_Details.create({
                    vendor_management_id,
                    bank_name,
                    branch,
                    bank_address,
                    country_id,
                    country_name,
                    state_id,
                    state_name,
                    contact_number,
                    fax,
                    branch_city,
                    account_type,
                    bank_account_number,
                    ifsc_number,
                    account_holder_name,
                    swift_code,
                    micr_code
                });
                return res.status(200).send({ code: 200, message: "Bank Details Created Successfully!", data: response })
            } else {
                return res.status(405).send({ code: 405, message: `Vendor Management Id is not available for ${vendor_management_id}` });
            }
        } else {
            return res.status(404).send({ code: 404, message: "Vendor Management Id is Required" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" })
    };
};

/////////////// Edit Bank Details Vendor Management ///////////////

exports.edit_Bank_Details_Vendor_Management = async (req, res) => {
    try {
        const bankDetailsId = req.params.id;
        const { vendor_management_id, bank_name, branch, bank_address, country_id, country_name, state_id, state_name,branch_city, contact_number, fax, account_type, bank_account_number, ifsc_number,
            account_holder_name, swift_code, micr_code } = req.body;
        const editData = await bank_Details.findOne({ bank_details_id: bankDetailsId })
        if (editData) {
            const updateData = await bank_Details.update(
                {
                    vendor_management_id,
                    bank_name,
                    branch,
                    bank_address,
                    country_id,
                    country_name,
                    state_id,
                    state_name,
                    contact_number,
                    fax,
                    branch_city,
                    account_type,
                    bank_account_number,
                    ifsc_number,
                    account_holder_name,
                    swift_code,
                    micr_code
                },
                { where: { bank_details_id: bankDetailsId } }
            );
            return res.status(200).send({ code: 200, message: "Bank Details Updated Successfully", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" })
    };
};

/////////////// Get ById Bank Details Vendor Management ///////////////

exports.get_ById_Bank_Details_Vendor_Management = async (req, res) => {
    try {
        const bankDetailsId = req.params.id
        const getAllData = await bank_Details.findAll({ where: { bank_details_id: bankDetailsId } })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Bank Details Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Get All Bank Details Vendor Management ///////////////

exports.get_All_Bank_Details_Vendor_Management = async (req, res) => {
    try {
        const getAllData = await bank_Details.findAll({ where: { bank_status: "ACTIVE" } })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Bank Details Data Successfully", data: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete Bank_Details ///////////////

exports.delete_Bank_Details = async (req, res) => {
    try {
        const bankDetailsId = req.params.id;
        const getData = await bank_Details.findOne({ where: { bank_details_id: bankDetailsId } });
        if (getData) {
            const updated = await bank_Details.update({ bank_status: "INACTIVE" }, { where: { bank_details_id: bankDetailsId } });
            return res.status(200).send({ code: 200, message: "Bank Details Data is Deleted Successfully!", data: updated });
        } else {
            return res.status(404).send({ code: 404, message: "Record Note Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};