module.exports = (sequelize, Sequelize) => {
    const dqsGroupMaster = sequelize.define("dqs_group_master", {
        dqs_group_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        group_name: {
            type: Sequelize.STRING
        },
        emails: {
            type: Sequelize.JSON
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },

    });
    return dqsGroupMaster;
};