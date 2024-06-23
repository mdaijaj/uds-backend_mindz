module.exports = (sequelize, Sequelize) => {
    const vendor_invoice = sequelize.define("vendor_invoice", {
        vendor_invoice_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        vendor_name: {
            type: Sequelize.STRING
        },
        p_o_number: {
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
    return vendor_invoice;
};