module.exports = (sequelize, Sequelize) => {
    const secuirtyDetails = sequelize.define("house_Agreement", {
        security_agreement_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name_of_agreement: {
            type: Sequelize.STRING
        },
        request_initiated_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")

        },
        vendor_name: {
            type: Sequelize.STRING
        },
        company_name: {
            type: Sequelize.STRING
        },
        description_of_agreement: {
            type: Sequelize.STRING
        },
        count_of_employees: {
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
        upload_agreement_copy: {
            type: Sequelize.STRING
        },
        hk_status: {
            type: Sequelize.STRING
        },

        terminate_date: {
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
    return secuirtyDetails;
}
