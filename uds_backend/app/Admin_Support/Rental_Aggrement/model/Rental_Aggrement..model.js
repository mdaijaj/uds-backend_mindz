module.exports = (sequelize, Sequelize) => {
    const rental_aggrementDetails = sequelize.define("Rental_Aggrement", {
        rental_aggrement_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name_of_the_Agreement: {
            type: Sequelize.STRING
        },
        request_initiated_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")

        },
        vendor_name: {
            type: Sequelize.STRING
        },
        tenant_name: {
            type: Sequelize.STRING
        },
        description_of_amc: {
            type: Sequelize.STRING
        },
        agreement_from_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")

        },
        agreement_to_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        no_of_years: {
            type: Sequelize.STRING
        },
        increment_yearly: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.INTEGER
        },
        tax: {
            type: Sequelize.INTEGER
        },
        total_amount: {
            type: Sequelize.INTEGER
        },
        first_reminder: {
            type: Sequelize.STRING
        },
        second_reminder: {
            type: Sequelize.STRING
        },
        third_reminder: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        upload_agreement_copy: {
            type: Sequelize.STRING
        },
        rental_status: {
            type: Sequelize.STRING
        },
        termination_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        terminate_copy_upload: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        }
    })
    return rental_aggrementDetails;
}
