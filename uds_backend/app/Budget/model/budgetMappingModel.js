module.exports = (sequelize, Sequelize) => {
    const tbl_budgetMapping = sequelize.define("tbl_budgetMapping", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        budgetAllocatedBy: {
            type: Sequelize.STRING
        },
        budgetAllocatedDate: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.FLOAT
        },
        extend_type:{
            type: Sequelize.ENUM("Increase", "Decrease")
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
        isDeleted: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false
        }
    }, {
        freezeTableName: true
    });
    return tbl_budgetMapping;
}