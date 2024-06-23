module.exports = (sequelize, Sequelize) => {
    const amcOtherDocoments = sequelize.define("AMC_Agreement_other_doc", {
       amc_other_document_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        amc_agreement_id: {
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
    return amcOtherDocoments;
}