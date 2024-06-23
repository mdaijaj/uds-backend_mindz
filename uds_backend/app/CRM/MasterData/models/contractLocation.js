const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const contractLocation = sequelize.define(
    "CRM_CONTRACT_LOCATION_MST",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      location: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      isDeleted: {
        type: Sequelize.BOOLEAN(true, false),
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return contractLocation;
};