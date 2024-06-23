module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("registered_users", {
    employee_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
    },
    user_role: {
      type: Sequelize.STRING,
      defaultValue: "User",
    },
    role_master_id: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    employee_official_email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    employee_code: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    middle_name: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "--"
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    segment_suv: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    designation: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    region: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    department: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    reporting_manager_id: {
      type: Sequelize.INTEGER
    },
    reporting_manager: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    probation: {
      type: Sequelize.STRING,
      // defaultValue: "NA",
      // allowNull: true
    },

    reporting_office_location: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    reporting_plant_location: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    working_physical_location: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    band: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    grade: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    employee_photo: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    mobile_number: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    //added for code
    mobile_code: {
      type: Sequelize.STRING,
    },

    personal_email: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    // probation: {
    //   type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
    //   defaultValue: "ACTIVE",
    //   allowNull: true
    // },
    date_of_birth: {
      type: Sequelize.DATEONLY("YYYY-MM-DD"),
    },
    date_of_joining: {
      type: Sequelize.DATEONLY("YYYY-MM-DD"),
    },
    probation1: {
      type: Sequelize.DATEONLY("YYYY-MM-DD"),
    },
    status: {
      type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
      allowNull: true
    },
    tatal_ctc: {
      type: Sequelize.STRING
    },
    fixed_ctc: {
      type: Sequelize.STRING
    },
    variable_ctc: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.INTEGER,
    },
    state: {
      type: Sequelize.INTEGER,
    },
    city: {
      type: Sequelize.INTEGER,
    },
    pincode: {
      type: Sequelize.STRING,
    },
    alternate_mobile: {
      type: Sequelize.STRING,
    },
    blood_group: {
      type: Sequelize.STRING,
    },
    maritial_status: {
      type: Sequelize.STRING,
    },
    spouse_name: {
      type: Sequelize.STRING,
    },
    pan_number: {
      type: Sequelize.STRING,
    },
    adhar_number: {
      type: Sequelize.STRING,
    },
    address_check_value: {
      type: Sequelize.STRING,
    },
    current_address: {
      type: Sequelize.JSON,
    },
    parmanent_address: {
      type: Sequelize.JSON,
    },
    previous_employee_details: {
      type: Sequelize.JSON,
    },
    bank_name: {
      type: Sequelize.STRING,
    },
    bank_address: {
      type: Sequelize.STRING,
    },
    employee_name_in_bank: {
      type: Sequelize.STRING,
    },
    account_number: {
      type: Sequelize.TEXT,
    },
    ifsc_code: {
      type: Sequelize.STRING,
    },
    pf_number: {
      type: Sequelize.STRING,
    },
    UAN_number: {
      type: Sequelize.STRING,
    },
    family_details: {
      type: Sequelize.JSON
    },
    employee_status: {
      type: Sequelize.BOOLEAN(true, false),
      defaultValue: false
    },
    final_form_submit: {
      type: Sequelize.STRING,
    },
    permanent_country: {
      type: Sequelize.INTEGER,
    },
    permanent_state: {
      type: Sequelize.INTEGER,
    },
    permanent_city: {
      type: Sequelize.INTEGER,
    },
    token: {
      type: Sequelize.STRING,
    },
    isDeleted: {
      type: Sequelize.BOOLEAN(true, false),
      defaultValue: false
    }
  });
  return User;
};
