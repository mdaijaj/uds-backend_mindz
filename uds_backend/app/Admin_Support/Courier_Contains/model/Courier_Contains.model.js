module.exports = (sequelize, Sequelize) => {
    const courier_containsDetails = sequelize.define("Courier_contains", {
        courier_contains_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        courier_contains_name: {
            type: Sequelize.STRING
        },
        isDeleted: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        }
    })
    return courier_containsDetails;
}
