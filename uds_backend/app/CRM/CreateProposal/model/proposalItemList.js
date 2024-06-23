const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const proposalItemList = sequelize.define(
    "CRM_PROPOSAL_ITEM_LIST_MST",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      price_per_unit:{
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
  return proposalItemList;
};