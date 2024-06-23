module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("role", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    role_name: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  });
  return Role;
};