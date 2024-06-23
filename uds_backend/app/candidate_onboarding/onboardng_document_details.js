module.exports = (sequelize, Sequelize) => {
    const Onboarding_document_data = sequelize.define("Onboarding_document_Data", {
        onboarding_document_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employee_id:{
            type: Sequelize.INTEGER,
        },
        attchment:{
            type: Sequelize.STRING
        },
        document_type: {
            type: Sequelize.STRING
        },
        document_name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        status:{
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        }
    })
    return Onboarding_document_data;
}

