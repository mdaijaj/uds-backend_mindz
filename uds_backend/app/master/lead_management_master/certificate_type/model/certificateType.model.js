module.exports = (sequelize, Sequelize) => {
    const certificateTypeDetails = sequelize.define("certificate_type", {
        certificate_type_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        certificate_type_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE" , "INACTIVE"),
            defaultValue: "ACTIVE",
            allowNull :true
          }, 
 
    });
    return certificateTypeDetails;
};