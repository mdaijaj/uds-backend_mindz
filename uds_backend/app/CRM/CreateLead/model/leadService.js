const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const leadService = sequelize.define(
    "CRM_LEAD_SERVICE_MST",
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
  return leadService;
};