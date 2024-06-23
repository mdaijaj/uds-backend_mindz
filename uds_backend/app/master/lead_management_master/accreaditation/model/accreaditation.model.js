module.exports = (sequelize, Sequelize) => {
    const accreaditationDetails = sequelize.define("accreaditation", {
        accreaditation_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        accreaditation_name: {
            type: Sequelize.STRING
        },
        accreditationID: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        accreditedOfficeID: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        accreditationBodyID: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        standardID: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        industryCodeGroupId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        industryCodeID: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        accreaditation_files: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    });
    return accreaditationDetails;
}