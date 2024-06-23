module.exports = (sequelize, Sequelize) => {
    const policyDetails = sequelize.define("Policy", {
        policy_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        policy_name: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        }
    })
    return policyDetails;
}
