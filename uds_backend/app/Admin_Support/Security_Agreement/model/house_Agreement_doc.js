module.exports = (sequelize, Sequelize) => {
    const houseDocoments = sequelize.define("house_Agreement_doc", {
       house_doc_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        security_agreement_id: {
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
    return houseDocoments;
}