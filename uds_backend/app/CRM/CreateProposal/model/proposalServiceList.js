const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const proposalServiceList = sequelize.define(
    "CRM_PROPOSAL_SERVICE_LIST_MST",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      service_name:{
        type: Sequelize.STRING,
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
      status:{
        type:Sequelize.BOOLEAN,
        defaultValue:true,
      }
    },
    {
      freezeTableName: true,
    }
  );
  return proposalServiceList;
};