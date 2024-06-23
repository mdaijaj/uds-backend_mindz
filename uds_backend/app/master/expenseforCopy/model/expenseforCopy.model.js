module.exports = (sequelize, Sequelize) => {
    const expenseforCopyDetails = sequelize.define("expenseforCopy", {
        expenseforCopy_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        expenseforCopy_name: {
            type: Sequelize.STRING
        },
        isDeleted: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    });
    return expenseforCopyDetails;
}