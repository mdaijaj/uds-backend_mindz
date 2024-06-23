const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const productService = sequelize.define(
    "SYS_PRODUCT_ASSET_ITEM_MST",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    },

    {
      freezeTableName: true,
    }
  );
  return productService;
};