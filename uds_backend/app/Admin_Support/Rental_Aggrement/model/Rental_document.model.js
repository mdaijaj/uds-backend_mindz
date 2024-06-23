module.exports = (sequelize, Sequelize) => {
    const RentalDocoments = sequelize.define("Rental_document", {
        rental_document_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        rental_aggrement_id: {
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
    return RentalDocoments;
}