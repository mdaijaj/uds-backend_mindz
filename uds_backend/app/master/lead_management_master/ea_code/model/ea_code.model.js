module.exports = (sequelize, Sequelize) => {
    const eaCodeDetails = sequelize.define("ea_code", {
        ea_code_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ea_code_name: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    });
    return eaCodeDetails;
}