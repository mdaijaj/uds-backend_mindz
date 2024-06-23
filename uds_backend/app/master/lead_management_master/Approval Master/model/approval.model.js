module.exports = (sequelize, Sequelize) => {
    const approvalDetails = sequelize.define("approval_name", {
        approval_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        approval_name: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    });
    return approvalDetails;
}