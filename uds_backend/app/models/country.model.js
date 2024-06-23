module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define("country", {
      c_name: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      isDeleted:{
        type:Sequelize.BOOLEAN
      },
      // createdAt: {
      //   type: Sequelize.INTEGER
      // },
      // updatedAt: {
      //   type: Sequelize.INTEGER
      // }
    });

    return Country;
  };
  