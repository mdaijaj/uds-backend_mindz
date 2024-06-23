module.exports = (sequelize, Sequelize) => {
    const facilityDetails = sequelize.define("Facility_Remote", {
        facility_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        facility_type: {
            type: Sequelize.STRING
        },
        initiated_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        person_name: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        repair: {
            type: Sequelize.STRING
        },
        type_of_request: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        upload_documents_copy: {
            type: Sequelize.STRING
        },
        upload_vendor_copy: {
            type: Sequelize.STRING
        },
        upload_comparative_copy : {
            type: Sequelize.STRING
        },
        upload_sign_copy  : {
            type: Sequelize.STRING
        },
        closed_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        facility_status : {
            type: Sequelize.STRING
        },
        facility: {
            type: Sequelize.STRING
        },
        agreement_signed_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        remort_status: {
            type: Sequelize.ENUM("OPEN", "REJECTED", "CLOSED", "INPROGRESS"),
            defaultValue: "OPEN"
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        }
    })
    return facilityDetails;
}
