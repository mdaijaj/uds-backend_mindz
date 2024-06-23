const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const addPoOVC = sequelize.define(
    "CRM_ADD_PO_OVC_MST",
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
  return addPoOVC;
};