module.exports = (sequelize, Sequelize) => {
    const expense_invoice = sequelize.define("expense_invoice", {
        expense_invoice_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        emp_name: {
            type: Sequelize.STRING
        },
        ticket_no: {
            type: Sequelize.INTEGER
        },
        date: {
            type: Sequelize.STRING
        },
        payble_amount: {
            type: Sequelize.INTEGER
        },
        paid_amount: {
            type: Sequelize.INTEGER
        },
        pending_amount: {
            type: Sequelize.INTEGER
        },
        reference_no: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },

    });
    return expense_invoice;
};