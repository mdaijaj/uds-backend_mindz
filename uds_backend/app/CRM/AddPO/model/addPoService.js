const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const addPoService = sequelize.define(
    "CRM_ADD_PO_SERVICE_MST",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      frequency:{
        type: Sequelize.INTEGER
      },
      qty:{
        type: Sequelize.INTEGER
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
  return addPoService;
};