module.exports = (sequelize, Sequelize) => {
    const Courier_Service_nameDetails = sequelize.define("Courier_Service_name", {
        courier_Service_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        courier_Service_name: {
            type: Sequelize.STRING
        },
        isDeleted: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false,
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: "ACTIVE"
        }
    })
    return Courier_Service_nameDetails;
}
