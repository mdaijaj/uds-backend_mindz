module.exports = (sequelize, Sequelize) => {
  const BankType = sequelize.define("bank_name", {
    bank_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    bank_name: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
    filter_status:{
      type: Sequelize.STRING,
      defaultValue:"HRMS"
    }
  });
  return BankType;
};