module.exports = (sequelize, Sequelize) => {
    const itTicketing = sequelize.define("it_ticketing", {
        itTicketing_number: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employee_id: {
            type: Sequelize.INTEGER
        },
        ticket_raised_by: {
            type: Sequelize.STRING
        },
        on_behalf_of: {
            type: Sequelize.STRING
        },
        others_name: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        stage: {
            type: Sequelize.STRING
        },
        subject: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        attachment: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("OPEN", "CLOSE", "IN-PROGRES"),
            defaultValue: "OPEN"
        },
        remarks: {
            type: Sequelize.STRING
        },
        ticket_assigned_to: {
            type: Sequelize.STRING
        }

    });
    return itTicketing;
};