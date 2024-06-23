module.exports = (sequelize, Sequelize) => {
    const associatedCompanyDetails = sequelize.define("associated_company", {
        associated_company_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        associated_company_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE" , "INACTIVE"),
            defaultValue: "ACTIVE",
            allowNull :true
          }, 
 
    });
    return associatedCompanyDetails;
};