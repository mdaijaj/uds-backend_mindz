const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const proposalData = sequelize.define(
    "CRM_CREATE_PROPOSAL_MST",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      proposal_no: {
        type: Sequelize.STRING,
      },
      osc: {
        type: Sequelize.FLOAT,
      },
      no_of_service: {
        type: Sequelize.INTEGER,
      },
      osc_gst: {
        type: Sequelize.STRING,
      },
      osc_total: {
        type: Sequelize.INTEGER,
      },
      tot_purchase: {
        type: Sequelize.INTEGER,
      },
      tot_gst: {
        type: Sequelize.STRING,
      },
      tot_total: {
        type: Sequelize.INTEGER,
      },
      tr_purchase: {
        type: Sequelize.INTEGER,
      },
      tr_gst: {
        type: Sequelize.STRING,
      },
      tr_total: {
        type: Sequelize.INTEGER,
      },
      tos_charge: {
        type: Sequelize.INTEGER,
      },
      tos_gst: {
        type: Sequelize.STRING,
      },
      tos_total: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      proposal_status: {
        type: Sequelize.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
      },
      from_date: {
        type: Sequelize.DATEONLY,
      },
      to_date: {
        type: Sequelize.DATEONLY,
      },
      new_version:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
    },
    {
      freezeTableName: true,
    }
  );
  return proposalData;
};