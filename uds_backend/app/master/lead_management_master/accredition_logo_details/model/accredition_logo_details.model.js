module.exports = (sequelize, Sequelize) => {
    const accredition_logo_detailsDetails = sequelize.define("accredition_logo_details", {
        accredition_logo_details_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        accredition_logo_details_name: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE",
            allowNull: true
        },
    });
    return accredition_logo_detailsDetails;
};