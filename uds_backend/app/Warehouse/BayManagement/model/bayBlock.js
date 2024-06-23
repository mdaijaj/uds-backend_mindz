const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const bayBlock = sequelize.define(
    "WAREHOUSE_BAY_BLOCK_DETAIL_MST",
    {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      block_name: {
        type: Sequelize.STRING,
      },
      no_of_bays: {
        type: Sequelize.INTEGER,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN
      }
    },
    {
      freezeTableName: true,
    }
  );
  return bayBlock;
};