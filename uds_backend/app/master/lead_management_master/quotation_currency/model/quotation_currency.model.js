module.exports = (sequelize, Sequelize) => {
    const quotation_currencyDetails = sequelize.define("quotation_currency", {
        quotation_currency_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quotation_currency_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        isDeleted: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE",
            allowNull: true
        },

    });
    return quotation_currencyDetails;
};