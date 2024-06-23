module.exports = (sequelize, Sequelize) => {
    const itTicketing_pending_task = sequelize.define("it_ticketing_pending_task", {
        itTicketing_pending_taks: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        itTicketing_no: {
            type: Sequelize.INTEGER
        },
        ticket_raised_by: {
            type: Sequelize.STRING
        },
        subject: {
            type: Sequelize.STRING
        },
        created_date: {
            type: Sequelize.DATEONLY
        },
        category: {
            type: Sequelize.STRING
        },
        assigned_to: {
            type: Sequelize.STRING
        },
        assigned_id: {
            type: Sequelize.INTEGER
        },
        remarks: {
            type: Sequelize.STRING
        }

    });
    return itTicketing_pending_task;
};