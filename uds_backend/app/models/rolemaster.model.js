module.exports = (sequelize, Sequelize) => {
  const RoleMaster = sequelize.define("rolemaster", {
    name: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  }, {
    timestamps: true,
  });

  return RoleMaster;
};