module.exports = (sequelize, Sequelize) => {
    const insuranceDocoments = sequelize.define("Insurance_doc", {
       insurance_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        insurance_id: {
            type: Sequelize.INTEGER,
        },
        file_name: {
            type: Sequelize.STRING,
        },
        upload_agreement_copy: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.ENUM('ACTIVE', 'INACTIVE'),
            defaultValue: 'ACTIVE'
        }
    })
    return insuranceDocoments;
}