const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const productService = sequelize.define(
    "SYS_PRODUCT_SERVICE_MST",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      service_name: {
        type: Sequelize.STRING,
      },
      service_code: {
        type: Sequelize.STRING,
      },
      service_description: {
        type: Sequelize.STRING,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN(true, false),
        defaultValue: false,
      },
      status: {
        type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
        defaultValue: "ACTIVE",
        allowNull: true
      },
    },

    {
      freezeTableName: true,
    }
  );
  return productService;
};