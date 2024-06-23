module.exports = (sequelize, Sequelize) => {

    const Work_Flow = sequelize.define('workFlow', {
        workflow_id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        workflow_type:{
            type: Sequelize.STRING,
        },
        workflow_category:{
            type: Sequelize.INTEGER
        },
        workflow_department:{
            type: Sequelize.INTEGER
        },
        status:{
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
        workflow_status : {
            type: Sequelize.ENUM("APPROVED", "PENDING"),
            defaultValue: "PENDING"
        }
    },
    )
    return Work_Flow;
}