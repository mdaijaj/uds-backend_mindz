module.exports = (sequelize, Sequelize) => {
    const verticals = sequelize.define("verticals", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      vertical_name: {
        type: Sequelize.STRING(255),
        // allowNull: false,
      }
    });
    return verticals;
}