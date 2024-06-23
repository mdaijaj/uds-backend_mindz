const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const proposalAssetList = sequelize.define(
    "CRM_PROPOSAL_ASSET_LIST_MST",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      allocation_type:{
        type: Sequelize.STRING,
      },
      frequency:{
        type: Sequelize.INTEGER
      },
      qty:{
        type: Sequelize.INTEGER
      },
      price:{
        type: Sequelize.FLOAT
      },
      gst:{
        type: Sequelize.STRING,
      },
      total:{
        type: Sequelize.FLOAT,
      },
      location:{
        type: Sequelize.STRING,
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
  return proposalAssetList;
};