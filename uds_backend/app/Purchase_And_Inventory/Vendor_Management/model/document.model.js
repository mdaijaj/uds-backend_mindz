module.exports = (sequelize, Sequelize) => {
    const documentDetail = sequelize.define("vendor_management_document", {
        document_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        vendor_management_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
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
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
        documents_status: {
            type: Sequelize.ENUM("REJECT", "VERIFY")
        },
    });
    return documentDetail;
};