module.exports = (sequelize, Sequelize) => {
    const Currency_Convert = sequelize.define("currency_covert", {
              Currency_Convert_id:{
                type:Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
              },
              Currency_Type:{
                type:Sequelize.STRING
              },
              rate: {
                type: Sequelize.DECIMAL(10, 5),
                require: true,
            },
    });
  
    return Currency_Convert;
  };