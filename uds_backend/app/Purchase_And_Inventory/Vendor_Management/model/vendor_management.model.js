module.exports = (sequelize, Sequelize) => {
    const vendorManagementDetail = sequelize.define("vendor_management", {
        vendor_management_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        vendor_name: {
            type: Sequelize.STRING
        },
        vendor_code: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        country_id: {
            type: Sequelize.INTEGER
        },
        country_name: {
            type: Sequelize.STRING
        },
        state_id: {
            type: Sequelize.INTEGER
        },
        state_name: {
            type: Sequelize.STRING
        },
        city_id: {
            type: Sequelize.INTEGER
        },
        city_name: {
            type: Sequelize.STRING
        },
        pin: {
            type: Sequelize.STRING
        },
        contact_number: {
            type: Sequelize.STRING
        },
        alternative_number: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        web_site_url: {
            type: Sequelize.STRING
        },
        web: {
            type: Sequelize.STRING
        },
        fax: {
            type: Sequelize.STRING
        },
        contact_person: {
            type: Sequelize.STRING
        },
        under_gst: {
            type: Sequelize.STRING
        },
        pan: {
            type: Sequelize.STRING
        },
        CIN_No: {
            type: Sequelize.STRING
        },
        gst_in: {
            type: Sequelize.STRING
        },
        description_of_goods: {
            type: Sequelize.STRING
        },
        msme: {
            type: Sequelize.STRING
        },
        currency: {
            type: Sequelize.STRING
        },
        term_and_conditions: {
            type: Sequelize.STRING
        },
        bank_name: {
            type: Sequelize.STRING
        },
        branch: {
            type: Sequelize.STRING
        },
        bank_address: {
            type: Sequelize.STRING
        },
        branch_city: {
            type: Sequelize.STRING
        },
        account_type: {
            type: Sequelize.STRING
        },
        bank_account_number: {
            type: Sequelize.STRING
        },
        ifsc_number: {
            type: Sequelize.STRING
        },
        account_holder_name: {
            type: Sequelize.STRING
        },
        swift_code: {
            type: Sequelize.STRING
        },
        micr_code: {
            type: Sequelize.STRING
        },
        document_name:{
            type:Sequelize.STRING
        },
        document_type: {
            type: Sequelize.STRING
        },
        upload_document: {
            type: Sequelize.STRING
        },
        expiry_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        remarks: {
            type: Sequelize.STRING
        },
        web_site_url: {
            type: Sequelize.STRING
        },
        asset_category_id: {
            type: Sequelize.INTEGER
        },
        vendor_status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE", "REJECTED", "ACCOUNT APPROVED"),
            defaultValue: "INACTIVE"
        },
        document_status: {
            type: Sequelize.ENUM("REJECT", "VERIFY"),
            defaultValue: "REJECT"
        },
        is_active: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false
        },
    });
    return vendorManagementDetail;
};