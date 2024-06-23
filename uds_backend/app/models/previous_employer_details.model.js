module.exports = (sequelize, Sequelize) => {
  const prevEmpDetails = sequelize.define("prev_emp_details", {

    prev_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    employee_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    company_name: {
      type: Sequelize.STRING
    },
    position: {
      type: Sequelize.STRING,
    },
    from_date: {

      type: Sequelize.DATEONLY('YYYY-MM-DD'),

    },
    to_date: {
      type: Sequelize.DATEONLY('YYYY-MM-DD'),
    },
    last_drawn_salary: {
      type: Sequelize.INTEGER,
    },
    reson_of_leaving: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },

  })
  return prevEmpDetails

}