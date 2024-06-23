module.exports = (sequelize, Sequelize) => {
    const StatesMaster = sequelize.define("statesmaster", {
      name: {
        type: Sequelize.STRING,
        // unique: true
      },
      status: {
        type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
        defaultValue: "ACTIVE",
      },
      filter_status:{
        type: Sequelize.STRING,
        defaultValue:"HRMS"
      }
    },{
        timestamps: true,
      }
    );

    return StatesMaster;
  };