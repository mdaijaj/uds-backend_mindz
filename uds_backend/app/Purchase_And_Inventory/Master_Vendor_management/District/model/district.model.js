module.exports = (sequelize, Sequelize) => {
    const districtDetail = sequelize.define("district", {
        district_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        district_name: {
            type: Sequelize.STRING
        },
        district_status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    });
    return districtDetail
}