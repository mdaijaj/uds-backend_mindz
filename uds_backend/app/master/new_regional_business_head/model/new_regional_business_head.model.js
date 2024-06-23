module.exports = (sequelize, Sequelize) => {
    const new_regional_business_headDetails = sequelize.define("new_regional_business_head", {
        new_regional_business_head_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        new_region_id: {
            type: Sequelize.INTEGER,
        },
        employee_id: {
            type: Sequelize.INTEGER,
        },
        segment_id:{
            type: Sequelize.INTEGER,
        },
        certificate_type:{
            type: Sequelize.INTEGER,
        },

        isChecked: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: true,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
        filter_status:{
            type: Sequelize.STRING,
            defaultValue:"S&M"
  }
    });
    return new_regional_business_headDetails;
}