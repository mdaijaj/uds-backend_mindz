const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const bayManagement = sequelize.define(
    "WAREHOUSE_BAY_MANAGEMENT_MST",
    {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
     total_no_of_block: {
        type: Sequelize.INTEGER,
      }
    },
    {
      freezeTableName: true,
    }
  );
  return bayManagement;
};