module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("registered_users", {
    title: {
      type: Sequelize.STRING,

    },
    employee_official_email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    employee_code: {
      type: Sequelize.STRING,

    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    middle_name: {
      type: Sequelize.STRING,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    emplyoment_type: {
      type: Sequelize.STRING,
    },
    segment_suv: {
      type: Sequelize.STRING,
    },
    designation: {
      type: Sequelize.STRING,
    },
    date_of_birth: {
      type: Sequelize.DATEONLY('2020-01-01'),

    },
    date_of_joining: {
      type: Sequelize.DATEONLY('2020-01-01'),

    },
    region: {
      type: Sequelize.STRING,
    },
    department: {
      type: Sequelize.STRING,
    },
    reporting_manager: {
      type: Sequelize.STRING,
    },
    reporting_office_location: {
      type: Sequelize.STRING,
    },
    reporting_plant_location: {
      type: Sequelize.STRING,
    },
    working_physical_location: {
      type: Sequelize.STRING,
    },
    band: {
      type: Sequelize.STRING,
    },
    grade: {
      type: Sequelize.STRING,
    },
    employee_photo: {
      type: Sequelize.STRING,

    },

    mobile_number: {
      type: Sequelize.STRING,
    },
    personal_email: {
      type: Sequelize.STRING,
    },
    probation_status: {
      type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
      allowNull: true
    },
    status1: {
      type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
      allowNull: true
    },
    total_ctc: {
      type: sequelize.INTEGER
    },
    fixed_ctc: {
      type: sequelize.INTEGER
    },
    Variable_ctc: {
      type: sequelize.INTEGER
    },
  });

  return User;
};
