module.exports = (sequelize, Sequelize) => {
    const salayDetails = sequelize.define("SalaryDetails", {
      // id: {
      //   type: Sequelize.INTEGER,
      //   primaryKey: true
      // },
      tatal_ctc: {
        type: Sequelize.INTEGER
      },
      fixed_ctc: {
        type: Sequelize.INTEGER
      },
      variable_ctc: {
        type: Sequelize.INTEGER
      },
    //   status: {
    //     type: Sequelize.STRING,
    //     defaultValue:'ACTIVE'

    //   },
    });
  
    return salayDetails;
  };