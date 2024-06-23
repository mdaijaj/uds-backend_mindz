module.exports = (sequelize, Sequelize) => {
    const usersTest = sequelize.define("userTest", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return usersTest;

}