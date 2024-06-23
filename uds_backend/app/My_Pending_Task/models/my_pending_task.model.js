module.exports = (sequelize, Sequelize) => {
    const myPendingTaskDetail = sequelize.define('my_pending_task', {
        pending_task_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        subject: {
            type: Sequelize.STRING
        },
        due_date: {
            type: Sequelize.DATEONLY("DD-MM-YYYY")
        },
        status_task: {
            type: Sequelize.STRING
        },
        priority: {
            type: Sequelize.STRING
        },
        related_to: {
            type: Sequelize.STRING
        },
        task_name: {
            type: Sequelize.STRING
        },
        task_owner: {
            type: Sequelize.STRING
        },
        task_assign_to: {
            type: Sequelize.STRING
        },
        assigney_action: {
            type: Sequelize.STRING
        },
        supporting_document: {
            type: Sequelize.STRING
        },
        system_ip: {
            type: Sequelize.STRING
        },
        browser: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    });
    return myPendingTaskDetail;
}