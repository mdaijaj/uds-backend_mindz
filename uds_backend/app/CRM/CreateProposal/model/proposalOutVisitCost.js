const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const proposalOutVisitCost = sequelize.define(
    "CRM_PROPOSAL_OVC_MST",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      bin_service:{
        type: Sequelize.STRING,
      },
      out_visit_cost: {
        type: Sequelize.INTEGER,
      },
      no_of_visitor:{
        type: Sequelize.INTEGER
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
  return proposalOutVisitCost;
};