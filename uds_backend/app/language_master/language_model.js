module.exports = (sequelize, Sequelize) => {
    const Language_Master = sequelize.define("language_master", {
        language_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        language_name: {
            type: Sequelize.STRING
        },
        isDeleted: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false,
        },
        status:{
            type: Sequelize.ENUM("ACTIVE", "INACTIVE", ),
            defaultValue: "ACTIVE"
        }

    });
    return Language_Master;
};