module.exports = (sequelize, Sequelize) => {
  const jobTypes = sequelize.define("job_types", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    job_type: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE"
    },
    filter_status:{
      type: Sequelize.STRING,
      defaultValue:"HRMS"
    }
  });
  return jobTypes;
}