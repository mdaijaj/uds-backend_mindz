module.exports = (sequelize, Sequelize) => {
    const approverDetails = sequelize.define("approver", {
        approver_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        approver_name: {
            type: Sequelize.STRING
        },
        level: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.ENUM("Approved", "Pending"),
            defaultValue: "Approved"
        },
    })
    return approverDetails;
}