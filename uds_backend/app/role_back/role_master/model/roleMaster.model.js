module.exports = (sequelize, Sequelize) => {
    const roleMasterDetails = sequelize.define("role_master", {
        role_master_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role_master_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE" , "INACTIVE"),
            defaultValue: "ACTIVE",
            allowNull :true
          }, 
 
    });
    return roleMasterDetails;
};