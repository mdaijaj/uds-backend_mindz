module.exports = (sequelize, Sequelize) => {
    const forex_currencyDetails = sequelize.define("forex_currency", {
        forex_currency_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        req_ref_no: {
            type: Sequelize.STRING
        },
        froex_currency: {
            type: Sequelize.STRING
        },
        request_initiated_date: {
            type: Sequelize.STRING
        },
        client_name: {
            type: Sequelize.STRING
        },
        t_o_number: {
            type: Sequelize.INTEGER
        },
        name_of_the_traveler: {
            type: Sequelize.STRING
        },
        residental_address: {
            type: Sequelize.STRING
        },
        email_id: {
            type: Sequelize.STRING
        },
        mobile_number: {
            type: Sequelize.STRING
        },
        pass_port_number: {
            type: Sequelize.STRING
        },
        pass_port_issued_date: {
            type: Sequelize.STRING
        },
        nationality: {
            type: Sequelize.STRING
        },
        duration_from_date: {
            type: Sequelize.STRING
        },
        duration_to_date: {
            type: Sequelize.STRING
        },
        country_to_visit: {
            type: Sequelize.STRING
        },
        currency_name: {
            type: Sequelize.JSON
        },
        remarks: {
            type: Sequelize.STRING
        },
        handover_amount: {
            type: Sequelize.INTEGER
        },
        handover_date: {
            type: Sequelize.STRING
        },
        currency_rate: {
            type: Sequelize.FLOAT
        },
        upload_memo_copy: {
            type: Sequelize.STRING
        },
        lerms_letter: {
            type: Sequelize.STRING
        },
        upload_Encashment_Letter: {
            type: Sequelize.STRING
        },
        upload_Cash_Receipt: {
            type: Sequelize.STRING
        },
        forex_status: {
            type: Sequelize.ENUM("APPROVED", "REJECTED")
        },
        forex_status: {
            type: Sequelize.STRING
        },
        purpose: {
            type: Sequelize.STRING
        },
        requested_amount: {
            type: Sequelize.STRING
        },
        received_amount: {
            type: Sequelize.STRING
        },
        received_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        returned_amount: {
            type: Sequelize.STRING
        },
        returned_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        closed_date: {
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        approved_by:{
            type: Sequelize.STRING
        },
        approved_date:{
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        reject_remarks:{
            type: Sequelize.STRING
        },
        returned_amount:{
            type: Sequelize.STRING
        },
        returned_date:{
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        flight_details:{
            type: Sequelize.STRING
        },
        date_of_departure:{
            type: Sequelize.DATEONLY("YYYY-MM-DD")
        },
        nature_of_business_visit:{
            type: Sequelize.STRING
        },
        status2: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        }
    })
    return forex_currencyDetails;
}
