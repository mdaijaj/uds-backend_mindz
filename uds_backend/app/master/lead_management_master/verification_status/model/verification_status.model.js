module.exports = (sequelize, Sequelize) => {
    const verificationStatus = sequelize.define("verification_status", {
        verification_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        verification_status: {
            type: Sequelize.ENUM("APPROVED", "REJECTED")
        },
    });
    return verificationStatus
}