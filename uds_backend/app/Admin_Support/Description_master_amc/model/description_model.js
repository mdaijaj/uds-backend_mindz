const { sequelize, Sequelize } = require("../../../models");

module.exports = (sequelize, Sequelize) => {
    const description_model = sequelize.define("amc_description", {
        amc_description_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        amc_description: {
            type: Sequelize.STRING
        },
        isDeleted: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        }
    })
    return description_model
}