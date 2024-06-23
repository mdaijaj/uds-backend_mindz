module.exports = (sequelize, Sequelize) => {
    const dqs_PSIDetails = sequelize.define("dqs_product_sector_industry", {
        dqs_product_sector_industry_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dqs_product_sector_industry_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE" , "INACTIVE"),
            defaultValue: "ACTIVE",
            allowNull :true
          }, 
 
    });
    return dqs_PSIDetails;
};