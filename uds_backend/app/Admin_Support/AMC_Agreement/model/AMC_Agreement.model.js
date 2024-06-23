module.exports = (sequelize, Sequelize) => {
    const amc_agreementDetails = sequelize.define("AMC_Agreement", {
        amc_agreement_id: {
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
        first_party:{
            type: Sequelize.STRING
        },
        second_party:{
            type:Sequelize.STRING
        },
        third_party:{
            type:Sequelize.STRING
        },
        fourth_party:{
            type:Sequelize.STRING
        },
        vendor_name: {
            type: Sequelize.STRING
        },
        company_name: {
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
        upload_agreement_copy: {
            type: Sequelize.STRING
        },
        ams_status: {
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
        },
        notice_period: {
            type: Sequelize.STRING
        },
        Customer_Status:{
            type: Sequelize.STRING
        },
        Remarks:{
            type: Sequelize.STRING
        }
    })
    return amc_agreementDetails;
}


