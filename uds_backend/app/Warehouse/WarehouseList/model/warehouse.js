const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const warehouse = sequelize.define(
    "WAREHOUSE_DETAIL_MST",
    {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      contact_no: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      alt_email: {
        type: Sequelize.STRING,
      },
    },
   
    {
      freezeTableName: true,
    }
  );
  return warehouse;
};