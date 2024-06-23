module.exports = (sequelize, Sequelize) => {
    const Work_Flow_range = sequelize.define('workFlowRange', {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        workflowrange_roleId:{
            type: Sequelize.INTEGER,
        },
        level:{
            type: Sequelize.INTEGER
        },
        status:{
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
        isDeleted: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false
        },
        progress_Status : {
            type: Sequelize.ENUM("APPROVED", "PENDING"),
            defaultValue: "PENDING"
        }
    },
    {
        freezeTableName: true
    });
    return Work_Flow_range;
}