module.exports = (sequelize, Sequelize) => {
    const log_details = sequelize.define("log_table", {
        log_details_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        status: {
            type: Sequelize.STRING
        },
        quantity: {
            type: Sequelize.STRING
        },
        MVP: {
            type: Sequelize.STRING
        },
        level : {
            type: Sequelize.STRING
        }
    });
    return log_details
}