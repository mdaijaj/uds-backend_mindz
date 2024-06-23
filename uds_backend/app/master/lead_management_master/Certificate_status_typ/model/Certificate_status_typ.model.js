module.exports = (sequelize, Sequelize) => {
    const certificateStatusTypeDetails = sequelize.define("certificate_status_type", {
        certificate_status_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        certificate_status_name: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE",
            allowNull: true
        },
    });
    return certificateStatusTypeDetails;
}
