module.exports = (sequelize, Sequelize) => {
    const billingSiteDetail = sequelize.define("multiple_site", {
        multiple_site_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        multiple_site_name: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    });
    return billingSiteDetail
}