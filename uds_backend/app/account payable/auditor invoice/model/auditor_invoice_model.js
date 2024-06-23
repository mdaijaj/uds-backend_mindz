module.exports = (sequelize, Sequelize) => {
    const auditor_invoice = sequelize.define("auditor_invoice", {
        auditor_invoice_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        auditor_name: {
            type: Sequelize.STRING
        },
        t_o_number: {
            type: Sequelize.INTEGER
        },
        invoice_number: {
            type: Sequelize.INTEGER
        },
        date: {
            type: Sequelize.STRING
        },
        invoice_amount: {
            type: Sequelize.INTEGER
        },
        transfer_order_number: {
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
    return auditor_invoice;
};