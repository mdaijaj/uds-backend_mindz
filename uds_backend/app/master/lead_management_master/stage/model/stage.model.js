module.exports = (sequelize, Sequelize) => {
    const stageDetails = sequelize.define("stage", {
        stage_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        stage_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE" , "INACTIVE"),
            defaultValue: "ACTIVE",
            allowNull :true
          }, 
 
    });
    return stageDetails;
};