module.exports = (sequelize, Sequelize) => {
    const customer_category = sequelize.define("customer_category", {
        customer_category_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        customer_category_name: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },

    });
    return customer_category;
};