module.exports = (sequelize, Sequelize) => {
    const bankDetail = sequelize.define("vendor_management_bank_details", {
        bank_details_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        vendor_management_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
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
        branch_id: {
            type: Sequelize.INTEGER
        },
        branch_city: {
            type: Sequelize.STRING
        },
        contact_number: {
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
        fax: {
            type: Sequelize.STRING
        },
        swift_code: {
            type: Sequelize.STRING
        },
        micr_code: {
            type: Sequelize.STRING
        },
        document_type: {
            type: Sequelize.STRING
        },
        upload_document: {
            type: Sequelize.STRING
        },
        expiry_date: {
            type: Sequelize.STRING
        },
        remarks: {
            type: Sequelize.STRING
        },
        bank_status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    });
    return bankDetail;
};