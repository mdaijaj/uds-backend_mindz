const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const addPo = sequelize.define(
    "CRM_ADD_PO_MST",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      po_start_date:{
        type: Sequelize.DATEONLY,
      },
      po_end_date:{
        type: Sequelize.DATEONLY,
      },
      po_number:{
        type: Sequelize.STRING,
      },
      upload_file:{
        type: Sequelize.STRING,
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
  return addPo;
};