const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const addPoAsset = sequelize.define(
    "CRM_ADD_PO_ASSET_MST",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status:{
        type:Sequelize.BOOLEAN,
        defaultValue:true,
      }
    },
    
    {
      freezeTableName: true,
    }
  );
  return addPoAsset;
};