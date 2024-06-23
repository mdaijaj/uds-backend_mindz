module.exports = (sequelize, Sequelize) => {
    const SBU = sequelize.define("sbu", {
      name: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
        defaultValue: "ACTIVE",
      },
    },{
        timestamps: true,
      }
    );

    return SBU;
  };
  