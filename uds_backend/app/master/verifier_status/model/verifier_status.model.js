module.exports = (sequelize, Sequelize) => {
    const verifier_statusDetails = sequelize.define("verifier_status", {
        verifier_status_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        verifier_status_name: {
            type: Sequelize.STRING
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
    return verifier_statusDetails;
}