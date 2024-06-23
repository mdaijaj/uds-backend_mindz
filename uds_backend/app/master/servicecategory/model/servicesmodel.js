module.exports = (sequelize, Sequelize) => {
    const Services = sequelize.define("ServicesCategory", {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        service_category_code: {
            type: Sequelize.STRING
        },
        service_category_name: {
            type: Sequelize.STRING
        },
        service_category_description: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
        isDeleted: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false
        }
    });
    return Services;
};