module.exports = (sequelize, Sequelize) => {
    const procurement = sequelize.define("procurement_approvel_level", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        level: {
            type: Sequelize.JSON
        },
        Approvel_status: {
            type: Sequelize.ENUM("APPROVED", "PENDING","REJECTED"),
            defaultValue: "PENDING"
        },
        progressStatus: {
            type: Sequelize.ENUM("OPEN", "CLOSE"),
            defaultValue: "OPEN"
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
        final_quantity : {
            type: Sequelize.STRING
        },
        final_MVP : {
            type: Sequelize.STRING
        }
    },
        {
            freezeTableName: true
        });
    return procurement
}