module.exports = (sequelize, Sequelize) => {
    const po_log_details = sequelize.define("po_budget_log_table", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        total_budget: {
            type: Sequelize.STRING
        },
        Total_Remaining_budget: {
            type: Sequelize.STRING
        },
        total_purchase: {
            type: Sequelize.STRING
        },
        remaining_budget: {
            type: Sequelize.STRING
        },
        department_name : {
            type: Sequelize.STRING
        },
        po_type : {
            type: Sequelize.STRING
        },
        created_by : {
            type: Sequelize.STRING
        },
    });
    return po_log_details
}