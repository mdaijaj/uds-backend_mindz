module.exports = (sequelize, Sequelize) => {
    const segmentDetails = sequelize.define("segment", {
        segment_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        segment_name: {
            type: Sequelize.STRING
        },
        isChecked: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: true,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
        filter_status:{
            type: Sequelize.STRING,
            defaultValue:"S&M"
          }
    });
    return segmentDetails;
}