module.exports = (sequelize, Sequelize) => {
    const itemMapping = sequelize.define("ITEM_MAPPING", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        freezeTableName: true,
      })
    return itemMapping;
}