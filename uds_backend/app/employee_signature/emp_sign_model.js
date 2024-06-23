module.exports = (sequelize, Sequelize) => {
    const emp_sign_data = sequelize.define("eemployee_signature", {
        signature_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employee_id: {
            type: Sequelize.STRING
        },
        emp_signature: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },

    });
    return emp_sign_data;
};