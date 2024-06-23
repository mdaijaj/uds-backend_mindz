const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const addPoItem = sequelize.define(
    "CRM_ADD_PO_ITEM_MST",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      }
    },
    
    {
      freezeTableName: true,
    }
  );
  return addPoItem;
};