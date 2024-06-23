module.exports = (sequelize, Sequelize) => {
  const BandType = sequelize.define("bandType", {
    band_type_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    band_type_name: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  });
  return BandType;
};