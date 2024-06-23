module.exports = (sequelize, Sequelize) => {
  const empFamilyDetail = sequelize.define("employee_family_details", {
    family_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },


    employee_id: {

      type: Sequelize.INTEGER,

    },
    family_member_name: {
      type: Sequelize.STRING,
    },
    date_of_birth: {
      type: Sequelize.DATEONLY('2020-01-01'),

    },
    relation: {
      type: Sequelize.STRING,
    },
    contact_number: {
      type: Sequelize.STRING,

    },
    remark: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },

  })


  return empFamilyDetail

}