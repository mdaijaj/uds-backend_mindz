module.exports = (sequelize, Sequelize) => {
    const componetType = sequelize.define("employee_salary", {
        employee_salary_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employee_id:{
            type: Sequelize.INTEGER,
        },
        Basic_Details: {
            type: Sequelize.JSON
        },
        Salary_Details: {
            type: Sequelize.JSON
        },
        Payment_Details: {
            type: Sequelize.JSON
        },
        component_formula:{
            type: Sequelize.JSON
        },
        Salary_breakup:{
            type: Sequelize.JSON
        },
        employee_salary_status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    });
    return componetType
}