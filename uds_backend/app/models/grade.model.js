module.exports = (sequelize, Sequelize) => {
    const Grade = sequelize.define("grade", {
      grade_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      grade_name: {
        type: Sequelize.STRING
      },
      isDeleted: {
        type: Sequelize.BOOLEAN(true, false),
        defaultValue: false,
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

    return Grade;
  };
