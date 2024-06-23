module.exports = (sequelize, Sequelize) => {
    const certificate_typeDetails = sequelize.define("new_certificate_type", {
        certificate_type_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        certificate_type_name: {
            type: Sequelize.STRING
        },
        segment_id: {
            type: Sequelize.INTEGER,
        },
        isChecked: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: true,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    });
    return certificate_typeDetails;
}