const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const bayBlockBay = sequelize.define(
    "WAREHOUSE_BAY_BLOCK_BAY_DETAIL_MST",
    {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      bay_number: {
        type: Sequelize.STRING,
      },
      no_of_racks: {
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
  return bayBlockBay;
};