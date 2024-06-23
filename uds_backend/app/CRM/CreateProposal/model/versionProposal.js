const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const versionData = sequelize.define(
    "CRM_VERSION_PROPOSAL_MST",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      version: {
        type: Sequelize.STRING
      },
      version_status:{
        type: Sequelize.ENUM('approved','pending'),
        defaultValue: 'pending'
      },
    },

    {
      freezeTableName: true,
    }
  );
  return versionData;
};