module.exports = (sequelize, Sequelize) => {
    const Onboarding_data = sequelize.define("Onboarding_Data", {
        Onboarding_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        candidate_id: {
            type: Sequelize.INTEGER
        },
        prefix:{
            type: Sequelize.STRING
        },
        First_name: {
            type: Sequelize.STRING
        },
        Middle_name: {
            type: Sequelize.STRING
        },
        Last_name: {
            type: Sequelize.STRING
        },
        Gender: {
            type: Sequelize.ENUM("male","female","transgender"),
        },
        DOB: {
            type: Sequelize.STRING
        },
        DOJ: {
            type: Sequelize.STRING
        },
        file_document: {
            type: Sequelize.STRING
        },
        Mobile_number: {
            type: Sequelize.STRING
        },
        personal_email: {
            type: Sequelize.STRING
        },
        current_addres: {
            type: Sequelize.JSON
        },
        permanent_address: {
            type: Sequelize.JSON
        },
        alternate_number: {
            type: Sequelize.STRING
        },
        blood_group: {
            type: Sequelize.STRING
        },
        Marital_status: {
            type: Sequelize.STRING
        },
        spouse_name: {
            type: Sequelize.STRING
        },
        Pancard: {
            type: Sequelize.STRING
        },
        Aadhar_card_number: {
            type: Sequelize.STRING
        },
        family_details: {
            type: Sequelize.JSON
        },
        previous_employement_details: {
            type: Sequelize.JSON
        },
        Document_details:{
            type: Sequelize.JSON
        },
        Onboarding_status:{
            type: Sequelize.STRING
        },
        status:{
            type: Sequelize.ENUM("ACTIVE","INACTIVE")
        },
        Hr_response:{
            type: Sequelize.STRING
        }
    })
    return Onboarding_data;
}
