module.exports = (sequelize, Sequelize) => {
    const insuranceDetails = sequelize.define("Insurance", {
        insurance_id: {
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
        policy_holder_name: {
            type: Sequelize.STRING
        },
        insurance_company_name: {
            type: Sequelize.STRING
        },
        third_party_assistant: {
            type: Sequelize.STRING
        },

        policy_name: {
            type: Sequelize.STRING
        },
        policy_number: {
            type: Sequelize.STRING
        },
        count_of_employees_covered: {
            type: Sequelize.STRING
        },
        total_sum_assured: {
            type: Sequelize.STRING
        },
        PTDA_individual: {
            type: Sequelize.STRING
        },
        ctc: {
            type: Sequelize.STRING
        },
        increment_yearly: {
            type: Sequelize.STRING
        },
        no_of_years: {
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
        policy_from_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        policy_to_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        policy_amount: {
            type: Sequelize.STRING
        },
        tax: {
            type: Sequelize.STRING
        },
        total_amount: {
            type: Sequelize.STRING
        },
        first_reminder: {
            type: Sequelize.STRING
        },
        second_reminder: {
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

        policy_status: {
            type: Sequelize.STRING
        },

        status_upload_date: {
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
    return insuranceDetails;
}
