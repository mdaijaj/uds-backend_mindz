module.exports = (sequelize, Sequelize) => {
    const directorDetails = sequelize.define("director", {
        director_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        director_name: {
            type: Sequelize.STRING
        },
        isChecked: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: true,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    });
    return directorDetails;
}