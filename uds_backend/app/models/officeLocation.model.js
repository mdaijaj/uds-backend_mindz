module.exports = (sequelize, Sequelize) => {
  const officeLocation = sequelize.define("officeLocation", {

    work_physical_location_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    work_physical_location_name: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: 'ACTIVE'
    }
  });

  // is: {
  //   args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
  //   msg:
  //     'The password must contain atleast 8 characters including at least 1 uppercase, 1 lowercase and one digit.'
  // }

  return officeLocation;
};