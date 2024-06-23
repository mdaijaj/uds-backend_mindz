module.exports = (sequelize, Sequelize) => {
    const expense_master = sequelize.define("expense_master", {
        exp_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        module_name: {
            type: Sequelize.STRING,
        },
        assign_master: {
            type: Sequelize.INTEGER,
        },
        levels: {
            type: Sequelize.INTEGER,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        }
    });
    return expense_master;
}