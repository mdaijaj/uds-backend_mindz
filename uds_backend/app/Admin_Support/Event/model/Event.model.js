module.exports = (sequelize, Sequelize) => {
    const eventDetails = sequelize.define("Events", {
        event_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        request_initiated_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        requested_By: {
            type: Sequelize.STRING
        },
        designation_of_person: {
            type: Sequelize.STRING
        },
        program_name: {
            type: Sequelize.STRING
        },
        budget_amount: {
            type: Sequelize.STRING
        },
        final_amount: {
            type: Sequelize.STRING
        },
        program_location: {
            type: Sequelize.STRING
        },
        date_of_program: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        upload_documents_copy: {
            type: Sequelize.STRING
        },
        upload_vendor_copy: {
            type: Sequelize.STRING
        },
        upload_comparative_copy: {
            type: Sequelize.STRING
        },
        upload_sign_copy: {
            type: Sequelize.STRING
        },
        agreement_signed_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        event_close_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        event_status: {
            type: Sequelize.ENUM("OPEN", "REJECTED", "CLOSED", "INPROGRESS"),
        },
        status_upload_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        }
    })
    return eventDetails;
}
